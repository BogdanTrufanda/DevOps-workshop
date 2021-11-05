import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { FC } from "react";
import { theme } from "../theme";

export const ThemeProvider: FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
