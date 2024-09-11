import type { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '../context/authContext';
import { Provider } from "@/context/sessionProvider"; //get user data from session
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;