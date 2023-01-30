import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = async (req, res) => {
  if (!res.socket.server.io) {
    const io = new ServerIO(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on("join", (room) => {
            if (room === undefined || room === null) return;
            console.log("Joining room", room);
            socket.join(room);
        });
        socket.on("leave", (room) => {
            if (room === undefined || room === null) return;
            console.log("Leaving room", room);
            socket.leave(room);
        });
        socket.on("room-message", (room, message) => {
            if (room === undefined || room === null) return;
            console.log("Message received", message);
            socket.to(room).emit("room-message-receive", message);
        });
    }
    );
    console.log("New Socket.io server started");
  }
  res.end();
};

export default SocketHandler;