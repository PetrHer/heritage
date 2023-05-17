import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next'
import { api } from "../utils/api";
import store from  "../utils/redux/store";

import "../styles/globals.css";
import { Provider } from "react-redux";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));
