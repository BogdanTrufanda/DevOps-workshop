import { createTheme, alpha, Slide } from "@mui/material";
import { blue, red } from "@mui/material/colors";

export const theme = createTheme({
  spacing: 4,
  palette: {
    mode: "dark",
    primary: {
      main: blue[500],
    },
    error: {
      main: red[600],
    },
    tonalOffset: 0.1,
    text: { primary: "#ddd" },
    background: {
      default: "#0a0a0a",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontWeightRegular: 500,
    fontFamily: "'Fira Code', monospace",
  },
  components: {
    MuiAlert: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          textTransform: "unset",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        thickness: 4,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "::-webkit-scrollbar": {
          height: 6,
          width: 6,
        },
        "::-webkit-scrollbar-thumb": {
          background: alpha("#fff", 0.5),
          borderRadius: 99,
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: alpha("#fff", 0.75),
          cursor: "drag",
        },
        "::-webkit-scrollbar-track": {
          background: alpha("#000", 0.5),
          borderRadius: 99,
        },
        "html, body, #root": {
          fontVariantLigatures: "normal",
          height: "100vh",
          WebkitFontSmoothing: "auto",
          width: "100vw",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          userSelect: "none",
        },
        root: {
          fontSize: 12,
        },
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        TransitionComponent: Slide,
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "inherit",
        },
      },
    },
  },
});
