import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "./context/DarkMode";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools position="bottom" buttonPosition="bottom-left" />
        </QueryClientProvider>
      </DarkModeProvider>
    </ErrorBoundary>
  </StrictMode>
);
