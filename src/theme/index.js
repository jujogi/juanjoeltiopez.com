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
      "*": {
        boxSizing: "border-box",
      },
      "html, body": {
        bg: "#0f1419",
        color: "#e8eaed",
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100vw",
        margin: 0,
        padding: 0,
      },
      "#__next": {
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100vw",
      },
      "*::placeholder": {
        color: "#6b7280",
      },
    },
  },
  breakpoints: {
    base: "0px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
  space: {
    responsiveBox: { base: 4, md: 6, lg: 8 },
    responsiveCard: { base: 4, md: 6 },
    responsiveGap: { base: 4, md: 6 },
    responsiveGrid: { base: 6, md: 8, lg: 12 },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "100%",
        px: { base: 4, md: 6, lg: 8 },
      },
    },
    Box: {
      baseStyle: {
        wordWrap: "break-word",
        overflowWrap: "break-word",
      },
    },
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
    Text: {
      baseStyle: {
        wordWrap: "break-word",
        overflowWrap: "break-word",
      },
    },
    Heading: {
      baseStyle: {
        wordWrap: "break-word",
        overflowWrap: "break-word",
      },
    },
  },
});

export default theme;
