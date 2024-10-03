import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import AdminComponent from "@/components/admin/admin";

export default function Admin({ session }) {
  return (
    <>
      <Head>
        <title>Admin - Certificate Verification System</title>
        <meta
          name="description"
          content="Admin Page for certificate verification system"
        />
      </Head>
      <div className="centerDiv">
        <AdminComponent session={session} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    if (session.user.image === undefined) {
      session.user.image = null;
    }
    return {
      props: { session },
    };
  }
  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
}
