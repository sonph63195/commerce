/**
 * NextAuth configuration for credentials provider (demo only).
 * In production, use OAuth or a real user database.
 */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "demo" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (credentials?.username === "demo" && credentials?.password === "demo") {
					return {
						id: "1",
						name: "Demo User",
						email: "demo@commerce.local",
						image: "https://randomuser.me/api/portraits/men/1.jpg",
					};
				}
				return null;
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
