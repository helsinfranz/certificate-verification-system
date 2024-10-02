import Student from "@/components/student/student";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Certificate Verification System</title>
        <meta
          name="description"
          content="Dashboard for certificate verification system"
        />
      </Head>
      <Student />
    </>
  );
}
