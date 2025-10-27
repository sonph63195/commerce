import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { TUser } from "@/models/user";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, _req) {
				// In a real application, you would fetch user from a database
				// and validate credentials here.
				const mockUser: TUser = {
					id: "1",
					username: "user",
					email: "user@example.com",
					password: "pass", // In a real app, hash and compare passwords
					firstName: "Test",
					lastName: "User",
					phone: "123-456-7890",
				};

				if (
					credentials?.username === mockUser.username &&
					credentials?.password === mockUser.password
				) {
					// Return user data to be stored in the JWT
					return mockUser;
				}
				return null;
			},
		}),
	],
	pages: {
		signIn: "/auth/signin", // You can define a custom sign-in page
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// Store all user data from the User type in the token
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.user) {
				// Expose all user data from the token to the session
				session.user = token.user as TUser;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
