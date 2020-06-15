import createGame from './public/game.js';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

const game = createGame();
game.state.screen = {width: 10, height: 10};

game.start();

game.subcribe((command) => {
    sockets.emit(command.type, command);
});

sockets.on("connection", (socket) => {
    const playerId = socket.id
    console.log(`> Player connected on server with id: ${playerId}`)

    game.addPlayer({playerId: playerId});

    socket.emit("sepup", game.state);

    socket.on("disconnect", () => {
        game.removePlayer({playerId: playerId});
        console.log(`> Player disconnected: ${playerId}`)
    })

    socket.on("move-player", (command) => {
        command.playerId = playerId;
        command.type = "move-player";

        game.movePlayer(command);
    });
})
 
server.listen(3000, () => {
    console.log("> Server listening on port: 3000");
});
