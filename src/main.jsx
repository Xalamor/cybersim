import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <HashRouter>
        <CssBaseline />
        <App />
    </HashRouter>
);
