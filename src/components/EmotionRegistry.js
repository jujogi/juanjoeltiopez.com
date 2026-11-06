"use client";

import { useState } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";

// Registro de estilos de Emotion para el App Router de Next.js.
// El CacheProvider de @chakra-ui/next-js no hace nada en la versión instalada, así que
// Emotion escribía <style> en línea junto a cada elemento y rompía la hidratación.
// Aquí los estilos se recogen en el servidor y se inyectan en <head> con useServerInsertedHTML.
export default function EmotionRegistry({ children }) {
  const [registry] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        // Los estilos globales (<Global />) se insertan con selector vacío
        inserted.push({ name: serialized.name, isGlobal: !selector });
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = registry.flush();
    if (names.length === 0) return null;

    const { cache } = registry;
    const globals = [];
    let styles = "";
    let dataEmotionAttribute = cache.key;

    names.forEach(({ name, isGlobal }) => {
      const style = cache.inserted[name];
      if (typeof style !== "string") return;
      if (isGlobal) {
        globals.push({ name, style });
      } else {
        styles += style;
        dataEmotionAttribute += ` ${name}`;
      }
    });

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style data-emotion={dataEmotionAttribute} dangerouslySetInnerHTML={{ __html: styles }} />
        )}
      </>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
