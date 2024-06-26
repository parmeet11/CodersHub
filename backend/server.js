require('dotenv').config();

const express = require('express');
const app = express();
const DbConnect = require('./database');
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const server = require('http').createServer(app);
const ACTIONS = require('./actions');


const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',//process.env.FRONT_URL,
        methods: ['GET', 'POST'],
    },
});

const corsOption = {
    credentials: true,
    origin : 'http://localhost:3000',
    //methods: ['GET', 'POST'],
}

app.use(cookieParser());

app.use(cors(corsOption));
app.use('/storage', express.static('storage'));

const PORT = process.env.PORT || 5500;

DbConnect();

app.use(express.json({ limit: '8mb'}));
app.use(router);

app.get('/',(req, res) => {
    res.send('hello');
})

const socketUserMapping = {

}

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on(ACTIONS.JOIN, ({roomId, user}) => {
        socketUserMapping[socket.id] = user;

    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) =>{
        io.to(clientId).emit(ACTIONS.ADD_PEER, {});
    });

    socket.emit(ACTIONS.ADD_PEER, {});
    socket.join(roomId);


    //console.log(clients);
    })


    

})


server.listen(PORT, () => console.log(`Running on port ${PORT}`));