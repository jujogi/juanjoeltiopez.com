"use client";

import { useEffect, useState } from "react";
import { Box, Heading, VStack, Link } from "@chakra-ui/react";

// Tabla de contenidos con resaltado de la sección activa
export default function TableOfContents({
  headings,
  title = "En este artículo",
  showTitle = true,
  ...props
}) {
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    if (!headings.length) return;

    // Sección activa = último H2 cuyo borde superior ya pasó el 30% superior de la ventana
    let frame = null;
    const update = () => {
      frame = null;
      const threshold = window.innerHeight * 0.3;
      let current = headings[0].id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= threshold) current = h.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <Box as="nav" aria-label={title} {...props}>
      {showTitle && (
        <Heading
          as="p"
          fontFamily="body"
          fontSize="xs"
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="0.1em"
          color="dark.textMuted"
          mb={3}
        >
          {title}
        </Heading>
      )}
      <VStack
        as="ol"
        align="stretch"
        spacing={0}
        listStyleType="none"
        borderLeft="1px"
        borderColor="dark.border"
      >
        {headings.map(h => {
          const isActive = h.id === activeId;
          return (
            <Box as="li" key={h.id}>
              <Link
                href={`#${h.id}`}
                display="block"
                py={1.5}
                pl={4}
                ml="-1px"
                borderLeft="2px"
                borderColor={isActive ? "accent.cyan" : "transparent"}
                color={isActive ? "white" : "dark.textSecondary"}
                fontSize="sm"
                lineHeight="short"
                _hover={{ color: "accent.cyan" }}
                onClick={() => setActiveId(h.id)}
              >
                {h.text}
              </Link>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
