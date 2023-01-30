import { getToken } from "next-auth/jwt"
import prisma from "../../../lib/prisma";

export async function getRoom(id) {
    return JSON.stringify(await prisma.chatRoom.findUnique({
        where: {
            id: parseInt(id)
        }
    }));
}

export async function getRoomBySlug(slug) {
    return JSON.stringify(await prisma.chatRoom.findUnique({
        where: {
            slug
        }
    }));
}

export async function updateRoom(id, data) {

    return await prisma.chatRoom.update({
        where: {
            id: parseInt(id)
        },
        data
    });
}

export async function deleteRoom(id) {
    return await prisma.chatRoom.delete({
        where: {
            id: parseInt(id)
        }
    });
}

export default async function handler(req, res) {
    const token = await getToken({req})
    const {id} = req.query
    if (token) {
        switch (req.method) {
            case "GET":
                const room = await prisma.chatRoom.findUnique({
                    where: {
                        id: parseInt(id)
                    }
                });
                if (room) {
                    res.status(200).json(room)
                }
                else {
                    res.status(404).end()
                }
                break;
            case "PUT":
            case "PATCH":
                const {name, maxUsers} = req.body
                const updatedRoom = await updateRoom(id, {
                    name,
                    maxUsers: parseInt(maxUsers)
                });
                if (updatedRoom) {
                    res.status(204).end()
                }
                else {
                    res.status(404).end()
                }
                break;
            case "DELETE":
                const deletedRoom = await deleteRoom(id);
                if (deletedRoom) {
                    res.status(204).end()
                }
                else {
                    res.status(404).end()
                }
                break;
            default:
                return res.status(405).end()
        }

    }
    else {
        switch (req.method) {
            case "PUT":
                const {currentUsers} = req.body
                const updatedPutRoom = await updateRoom(id, {
                    currentUsers: parseInt(currentUsers)
                });
                if (updatedPutRoom) {
                    res.status(204).end()
                }
                else {
                    res.status(404).end()
                }
                break;
            default:
                return res.status(405).end()
        }
    }
}