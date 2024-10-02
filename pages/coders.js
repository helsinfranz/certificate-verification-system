import CodersComp from "@/components/coders/coders";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Coders - Result Management System</title>
        <meta
          name="description"
          content="Coders for result management system"
        />
        <style>{`body { background: #000!important; }`}</style>
      </Head>
      <CodersComp />
    </>
  );
}
