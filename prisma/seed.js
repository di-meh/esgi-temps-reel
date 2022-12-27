const { PrismaClient } = require('@prisma/client')
const {randText, randSlug, randNumber, randPassword, randEmail, randFirstName } = require("@ngneat/falso");
const prisma = new PrismaClient()
const bcrypt = require("bcrypt");

async function main() {
    // Seed 10 chat rooms
    for (let i = 0; i < 10; i++) {
        const chatRoom = await prisma.chatRoom.create({
            data: {
                name: randText(),
                slug: randSlug(),
                maxUsers: randNumber({min: 3, max: 10}),
            },
        });
    }
    // Seed 3 users with "admin" password
    for (let i = 0; i < 3; i++) {
        const user = await prisma.user.create({
            data: {
                name: randFirstName(),
                email: randEmail(),
                password: bcrypt.hashSync("admin", 10),
            },
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
