import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    dark: {
      bg: "#0f1419",
      bgAlt: "#1a1d2e",
      surface: "#252936",
      border: "#2d3142",
      text: "#e8eaed",
      textSecondary: "#9ca3af",
    },
    accent: {
      cyan: "#06b6d4",
      cyanHover: "#0891b2",
      blue: "#3b82f6",
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "#0f1419",
        color: "#e8eaed",
      },
      "*::placeholder": {
        color: "#6b7280",
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: "accent.cyan",
          color: "white",
          _hover: {
            bg: "accent.cyanHover",
          },
        },
        ghost: {
          color: "#e8eaed",
          _hover: {
            bg: "dark.surface",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        color: "#e8eaed",
        _hover: {
          color: "accent.cyan",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
