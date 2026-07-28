import React, { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import App from "./App";
import "./output.css";

ReactDOM.createRoot(document.getElementById("root")).render(
 
   <BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
  <Toaster position="top-right" />
</BrowserRouter>

 
);
