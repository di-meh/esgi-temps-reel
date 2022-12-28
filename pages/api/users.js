// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../lib/prisma";
export async function getUsers() {
    const users = await prisma.User.findMany();
    return JSON.stringify(users);
}
export default async function handler(req, res) {
    res.status(200).json(await getUsers())
}