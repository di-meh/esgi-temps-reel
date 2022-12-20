import {getToken} from "next-auth/jwt"
import prisma from "../../../lib/prisma";

export async function getUser(id) {
    return await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
}

export async function updateUser(id, data) {
    return await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data
    });
}

export async function deleteUser(id) {
    return await prisma.user.delete({
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
                const user = await getUser(id);
                if (user) {
                    res.status(200).json(user)
                }
                else {
                    res.status(404).end()
                }
                break;
            case "PUT":
            case "PATCH":
                const {name, email, isAvailable} = req.body
                const updatedUser = await updateUser(id, {
                    name,
                    email,
                    isAvailable
                });
                if (updatedUser) {
                    res.status(204).end()
                }
                else {
                    res.status(404).end()
                }
                break;
            case "DELETE":
                const deletedUser = await deleteUser(id);
                if (deletedUser) {
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
    return res.status(401).end()

}