import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { closeDB, connectDB } from "@/utils/db";
import User from "@/utils/models/Users";
import { compare } from "bcryptjs";

export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB().catch((err) => {
          throw new Error(err);
        });

        const user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isPasswordCorrect = await compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }

        await closeDB();

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/account/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user: UserType = token.user as UserType;
      session.user = user;

      return session;
    },
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
