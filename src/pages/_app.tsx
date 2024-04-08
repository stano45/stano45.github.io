import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Navbar } from '@/components';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
