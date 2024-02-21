import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { mainTheme } from "./shared/styles/index.ts";
import { AuthContextProvider } from "./shared/contexts/index.ts";
import { ChatAppApiInterceptor } from "./shared/components/index.ts";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import "./shared/styles/css/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <ToastContainer containerId="A" />
      <BrowserRouter>
        <AuthContextProvider>
          <ChatAppApiInterceptor>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ChatAppApiInterceptor>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
