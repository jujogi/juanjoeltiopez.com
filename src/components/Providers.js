"use client";

import { ChakraProvider } from "@chakra-ui/react";
import EmotionRegistry from "@/components/EmotionRegistry";
import theme from "@/theme";

export function Providers({ children }) {
  return (
    <EmotionRegistry>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </EmotionRegistry>
  );
}
