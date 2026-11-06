import { extendTheme } from "@chakra-ui/react";

// Paleta "deep water": fondos de agua profunda, acento verde acuático y arena cálida.
// Se conservan los nombres de tokens existentes (dark.*, accent.cyan) para que
// todas las páginas adopten la nueva paleta sin cambios.
const palette = {
  bg: "#06171f",
  bgAlt: "#0a222c",
  surface: "#0f2f3b",
  surfaceRaised: "#143947",
  border: "#1d4554",
  text: "#e4efee",
  textSecondary: "#9fbcc0",
  textMuted: "#7b9ca1",
  accent: "#3ecf9e",
  accentHover: "#62dcb2",
  sand: "#e6c88f",
  sky: "#6cc3e6",
  ink: "#04141a",
};

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    dark: {
      bg: palette.bg,
      bgAlt: palette.bgAlt,
      surface: palette.surface,
      surfaceRaised: palette.surfaceRaised,
      border: palette.border,
      text: palette.text,
      textSecondary: palette.textSecondary,
      textMuted: palette.textMuted,
    },
    accent: {
      // "cyan" se mantiene como nombre por compatibilidad: ahora es verde acuático
      cyan: palette.accent,
      cyanHover: palette.accentHover,
      blue: palette.sky,
      sand: palette.sand,
    },
    water: {
      950: palette.ink,
    },
  },
  fonts: {
    heading: `var(--font-heading), Georgia, "Times New Roman", serif`,
    body: `var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  },
  styles: {
    global: {
      "*": {
        boxSizing: "border-box",
      },
      html: {
        scrollBehavior: "smooth",
      },
      "html, body": {
        bg: palette.bg,
        color: palette.text,
        overflowX: "clip",
        width: "100%",
        maxWidth: "100vw",
        margin: 0,
        padding: 0,
        WebkitFontSmoothing: "antialiased",
      },
      body: {
        backgroundImage: `radial-gradient(ellipse 80% 40% at 50% -10%, rgba(62, 207, 158, 0.08), transparent 70%)`,
        backgroundRepeat: "no-repeat",
      },
      "::selection": {
        bg: "rgba(62, 207, 158, 0.3)",
        color: "white",
      },
      "#__next": {
        overflowX: "clip",
        width: "100%",
        maxWidth: "100vw",
      },
      "*::placeholder": {
        color: palette.textMuted,
      },
      ":focus-visible": {
        outline: `2px solid ${palette.accent}`,
        outlineOffset: "2px",
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
      baseStyle: {
        fontWeight: "600",
        rounded: "full",
      },
      variants: {
        // Texto oscuro sobre el acento: mejor contraste que blanco sobre verde claro
        solid: {
          bg: "accent.cyan",
          color: "water.950",
          _hover: {
            bg: "accent.cyanHover",
          },
        },
        ghost: {
          color: palette.text,
          _hover: {
            bg: "dark.surface",
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        rounded: "full",
        px: 2.5,
        py: 0.5,
        letterSpacing: "0.04em",
        fontWeight: "600",
      },
      defaultProps: {
        variant: "subtle",
      },
    },
    Link: {
      baseStyle: {
        color: palette.text,
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
        fontWeight: "600",
        letterSpacing: "-0.01em",
        wordWrap: "break-word",
        overflowWrap: "break-word",
      },
    },
  },
});

export default theme;
