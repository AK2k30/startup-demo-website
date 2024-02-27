/* eslint-disable no-template-curly-in-string */
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css';

const RootLayout = ({ children }) => (
  <ClerkProvider>
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://stijndv.com" />
        <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9SHMQV1FFN"
        />

        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${'${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}'});
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
