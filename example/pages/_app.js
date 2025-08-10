import React from 'react';
import '../styles/globals.css';
import "../../dist/index.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;