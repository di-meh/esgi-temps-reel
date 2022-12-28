// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";
export async function getUsers() {
    const users = await prisma.user.findMany();
    return JSON.stringify(users);
}
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const users = await getUsers();
        if (users) {
            res.status(200).json(users)
        }
        else {
            res.status(404).end()
        }
    }
    else {
        res.status(405).end();
    }
}