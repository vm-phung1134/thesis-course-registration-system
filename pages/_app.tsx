import store from "@/redux/store";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthProvider } from "@/contexts/authContext";
import { LanguageProvider } from "@/contexts/languageContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <LanguageProvider>
          <Component {...pageProps} />
        </LanguageProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
