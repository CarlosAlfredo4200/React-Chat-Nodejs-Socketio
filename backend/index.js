import express from "express";
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketServer } from 'socket.io'

dotenv.config();


const app = express();
const port = process.env.PORT;

const server = http.createServer(app);
const io = new SocketServer(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('message', (body) => {
        console.log(body);
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6),
        });
    });
});


server.listen(port)

console.log('Server on port:', port);

