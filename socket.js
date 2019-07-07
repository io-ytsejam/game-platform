const io = require('socket.io')();


let connectionsNumber = 0;
const port = 8000;
io.listen(port);
console.log('listening on port ', port);


let users = io.sockets;




io.on('connection', (client) => {
    console.log('Connected');
    console.log(Object.keys(io.sockets.sockets));
    connectionsNumber++;
    console.log(`Connections: ${connectionsNumber}`)
    console.log(client.id);

    client.on("newUserLoggedIn", () => {
        console.log("emit updateActive");
        io.emit("updateActive");
    });

    client.on("userDisconnected", () => {
        console.log("User disconnected");
        io.emit("updateActive");
    });

    client.on('message', (data)=>{
        io.to(`${data.id}`).emit('message-received', data.message);
        console.log(data);
    });

    client.on("invitationToGameRoom", (data)=>{
        console.log(`Invitation sent to: ${data.name}`);
        io.to(data.id).emit("invitationToGameRoom", data);
    });

    client.on("invitationResponse", response => {
        console.log(`Response: ${response.response} id: ${response.senderId}`);
        io.to(response.senderId).emit("invitationResponse", response);
    });
    // Beginning of building multi player
    client.on("snakeUpdate", (move)=>{
       console.log(`SOCKET MOVEX: ${move.snake.moveX}`);
       console.log(`SOCKET MOVEY: ${move.snake.moveY}`);
    });
  });
