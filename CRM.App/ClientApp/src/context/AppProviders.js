import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { QueryClientProvider } from "./QueryClient";

export { AppProviders };

const baseUrl = document.getElementsByTagName("base")[0]?.getAttribute("href") ?? "/";

function AppProviders({ children }) {
  return (
    <QueryClientProvider>
      <BrowserRouter basename={baseUrl}>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
