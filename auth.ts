import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { connectDB } from '@/utils/db';
import User from '@/utils/models/Users';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        // Return null (do not throw) so Auth.js yields CredentialsSignin
        // instead of redirecting to the broken default /api/auth/error page.
        if (!email || !password) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
          return null;
        }

        // Do not close the shared mongoose connection — Next.js reuses it across requests.
        return {
          id: user._id.toString(),
          _id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  pages: {
    signIn: '/account/login',
    // Keep auth errors on the login page instead of /api/auth/error
    error: '/account/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          _id: (user as { _id: string })._id,
          email: user.email!,
          firstName: (user as { firstName: string }).firstName,
          lastName: (user as { lastName: string }).lastName,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user) {
        session.user = {
          ...session.user,
          _id: token.user._id,
          email: token.user.email,
          firstName: token.user.firstName,
          lastName: token.user.lastName,
        };
      }
      return session;
    },
  },
  trustHost: true,
});
