// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";
import { getToken } from "next-auth/jwt"
export async function getRooms() {
    const rooms = await prisma.chatRoom.findMany();
    return JSON.stringify(rooms);
}
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const rooms = await getRooms();
        if (rooms) {
            res.status(200).json(rooms)
        }
        else {
            res.status(404).end()
        }
    }
    else if (req.method === 'POST') {
        const token = await getToken({req})
        if (token) {
            const room = await prisma.chatRoom.create({
                data: req.body
            });
            res.status(201).json(room);
        }
        else {
            res.status(401).end();
        }
    }
    else {
        res.status(405).end();
    }

}