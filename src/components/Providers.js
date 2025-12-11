"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import { useState } from "react";
import createEmotionCache from "@/lib/emotionCache";
import theme from "@/theme";

export function Providers({ children }) {
  // Create cache only once on client-side
  const [cache] = useState(() => {
    if (typeof window !== 'undefined') {
      return createEmotionCache();
    }
    return null;
  });

  // During SSR, don't use cache
  if (cache === null) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
  }

  return (
    <CacheProvider value={cache}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
