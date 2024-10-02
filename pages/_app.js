import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {loading && (
        <div className="fullPageLoading">
          <Image
            src="/logo.png"
            alt="CVS Logo"
            className={"main_logo loading_logo"}
            style={{ cursor: "default" }}
            priority={true}
            width={150}
            height={150}
          />
        </div>
      )}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
