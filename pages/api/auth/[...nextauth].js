import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60, // 10 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jdoe@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                console.log("LALALALA", user.password, credentials.password, bcrypt.compareSync(credentials.password, user.password));
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    console.log("User authorized");
                    return user;
                }
                console.log("User not authorized");
                return null;
            },
            callbacks: {
                jwt: async ({ token, user }) => {
                    if (user) {
                        console.log("JWT callback: user");
                        token.id = user.id;
                        token.email = user.email;
                    }

                    return token;
                },
                session: async ({ session, token }) => {
                    if (token) {
                        console.log("Session token", token);
                        session.id = token.id;
                    }

                    return session;
                },
            },
        })
    ],
}
export default NextAuth(authOptions)