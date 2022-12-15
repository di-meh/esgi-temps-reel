import {Server} from "socket.io";

const SocketHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('input-submit', (x, y) => {
                socket.emit('result', x + y)
            })

            socket.on("message-sent", (message) => {
                console.log(socket.id, message)
            })
        })
    }
    res.end()
}

export default SocketHandler