import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@mui/material";
import { mainTheme } from "./shared/styles";
import { ChatAppApiInterceptor } from "./shared/APIs/ChatAppAPI";
import { AuthContextProvider } from "./shared/contexts/AuthContext";
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
