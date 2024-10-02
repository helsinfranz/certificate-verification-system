import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(credentials.email)
        ) {
          throw new Error("Invalid Email Address.");
        }
        if (!credentials.password || credentials.password.length === 0) {
          throw new Error("Password is required");
        }

        const client = await connectToDatabase();
        const collection = client.db().collection("users");
        const user = await collection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Login Error: Invalid Credentials.");
        }

        client.close();
        return {
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
