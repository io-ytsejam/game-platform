const io = require('socket.io')();


let connectionsNumber = 0;
const port = 8000;
io.listen(port);
console.log('listening on port ', port);


let users = io.sockets;

let dt;



io.on('connection', (client) => {
    console.log('Connected');
    console.log(Object.keys(io.sockets.sockets));
    connectionsNumber++;
    console.log(`Connections: ${connectionsNumber}`)
    console.log(client.id);
    // io.emit("userid", client.id); // should be client.id

    // io.emit("update-database");

    client.on("newUserLoggedIn", () => {
        console.log("I think I got this");
        io.emit("updateActive");
    });

    client.on("userDisconnected", () => {
        console.log("User disconnected");
        io.emit("updateActive");
    });

    client.on('message', (data)=>{ //dd
        io.to(`${data.id}`).emit('message-received', data.message);
        console.log(data);
        // console.log(data.id);
        // io.emit('message-received', data);
    });
    client.on("invitationToGameRoom", (data)=>{
        console.log(`Hello: ${data.name}`);
        io.to(data.id).emit("invitationToGameRoom", data);
    });

    client.on("invitationResponse", response => {
        console.log(`Response: ${response.response} id: ${response.senderId}`);
        io.to(response.senderId).emit("invitationResponse", response.response);
    });

    client.on("snakeUpdate", (move)=>{
       console.log(`SOCKET MOVEX: ${move.snake.moveX}`);
       console.log(`SOCKET MOVEY: ${move.snake.moveY}`);
    });
  });
