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
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return user;
                }
                return null;
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
            }

            return session;
        },
    },
    events: {
        async signOut(message) {
            await prisma.user.update({
                where: { email: message.token.email },
                data: { isAvailable: false },
            });
        }
    }
}
export default NextAuth(authOptions)