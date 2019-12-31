const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const http = require('http')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))


server.listen(port, () =>{
    console.log(`server started${port}...`);
} )

app.get('/test', function (request, response){
 response.sendFile(publicPath + '/test.html')
})

users = [];
connections = [];

io.sockets.on('connection', function (socket) {
    console.log('Успешное подключение!');
    connections.push(socket);
    socket.on('disconnect', function (data) {
        console.log('Успешное отключение!');
        connections.splice(connections.indexOf(socket), 1);

    })
    socket.on('send mess', function (data) {
        io.sockets.emit('add mess', {mess: data.mess, name:data.name});
    })
})