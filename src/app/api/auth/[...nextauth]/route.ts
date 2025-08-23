import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // 👈 Now imported from the new file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

