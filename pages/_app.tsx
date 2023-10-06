import store from "@/redux/store";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthProvider } from "@/contexts/authContext";
import { LanguageProvider } from "@/contexts/languageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SearchProvider } from "@/contexts/useSearchContext";
import { ClassroomStateContextProvider } from "@/contexts/authClassroomState";
import { SubscribeStateContextProvider } from "@/contexts/subscribeState";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <SubscribeStateContextProvider>
              <SearchProvider>
                <Component {...pageProps} />
              </SearchProvider>
            </SubscribeStateContextProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
