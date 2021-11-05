import { CssBaseline } from "@mui/material";
import ReactDOM from "react-dom";

import { App } from "./App";
import { ThemeProvider } from "./providers";

ReactDOM.render(
  <ThemeProvider>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
