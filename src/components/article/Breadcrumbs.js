"use client";

import { Box, HStack, Text, Link } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

// items: [{ label, href? }] — el último elemento es la página actual
export default function Breadcrumbs({ items }) {
  return (
    <Box as="nav" aria-label="Migas de pan" fontSize="sm">
      <HStack as="ol" spacing={1.5} listStyleType="none" flexWrap="wrap" color="dark.textMuted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <HStack as="li" key={item.label} spacing={1.5}>
              {item.href && !isLast ? (
                <Link
                  as={NextLink}
                  href={item.href}
                  color="dark.textSecondary"
                  _hover={{ color: "accent.cyan" }}
                >
                  {item.label}
                </Link>
              ) : (
                <Text
                  as="span"
                  color={isLast ? "dark.text" : "dark.textMuted"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </Text>
              )}
              {!isLast && <ChevronRightIcon aria-hidden="true" boxSize={3.5} />}
            </HStack>
          );
        })}
      </HStack>
    </Box>
  );
}
