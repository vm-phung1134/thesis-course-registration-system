import store from "@/redux/store";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthProvider } from "@/contexts/authContext";
import { LanguageProvider } from "@/contexts/languageContext";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import React from "react";
import { SearchProvider } from "@/contexts/useSearchContext";
import { ClassroomStateContextProvider } from "@/contexts/classroomState";
import { SubscribeStateContextProvider } from "@/contexts/subscribeState";
import { CurrentUserContextProvider } from "@/contexts/currentUserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydrateState}>
          <AuthProvider>
            <LanguageProvider>
              <CurrentUserContextProvider>
                <SubscribeStateContextProvider>
                  <ClassroomStateContextProvider>
                    <SearchProvider>
                      <Component {...pageProps} />
                    </SearchProvider>
                  </ClassroomStateContextProvider>
                </SubscribeStateContextProvider>
              </CurrentUserContextProvider>
            </LanguageProvider>
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
