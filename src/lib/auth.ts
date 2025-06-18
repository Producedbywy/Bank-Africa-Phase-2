import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth"; // (optional but recommended for typing)

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (credentials.email === "demo@lumo.finance" && credentials.password === "demo123") {
          return { id: "1", name: "Demo User", email: "demo@lumo.finance" };
        }

        if (credentials.email === "test@example.com" && credentials.password === "test123") {
          return { id: "2", name: "Test User", email: "test@example.com" };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}/wallet`;
    },
   
async session({ session, token }) {
  if (token?.sub && session.user) {
    session.user.id = token.sub;
  }
  return session;
},

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

