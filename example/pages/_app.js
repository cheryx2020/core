import React from 'react';
import '../styles/globals.css';
import "/node_modules/@cheryx2020/core/dist/index.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;