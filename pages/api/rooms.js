// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../lib/prisma";
export async function getRooms() {
    const rooms = await prisma.chatRoom.findMany();
    return JSON.stringify(rooms);
}
export default async function handler(req, res) {
    res.status(200).json(await getRooms())
}
