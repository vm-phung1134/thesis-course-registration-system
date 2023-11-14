import store from "@/redux/store";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthProvider } from "@/contexts/authContext";
import { LanguageProvider } from "@/contexts/languageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SearchProvider } from "@/contexts/useSearchContext";
import { ClassroomStateContextProvider } from "@/contexts/classroomState";
import { SubscribeStateContextProvider } from "@/contexts/subscribeState";
import { SocketProvider } from "@/contexts/useSocketContext";
import { CurrentUserContextProvider } from "@/contexts/currentUserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <SocketProvider>
              <CurrentUserContextProvider>
                <SubscribeStateContextProvider>
                  <ClassroomStateContextProvider>
                    <SearchProvider>
                      <Component {...pageProps} />
                    </SearchProvider>
                  </ClassroomStateContextProvider>
                </SubscribeStateContextProvider>
              </CurrentUserContextProvider>
            </SocketProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
