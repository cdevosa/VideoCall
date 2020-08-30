// Define modules
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { v4: uuidV4  } = require('uuid') 

// Express configuration
app.set('view engine', 'ejs')
app.use(express.static('public'))

//Currently going to the home page sends you to a video calling room
app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

//Once a room is joined pass on the room and user ID
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})

server.listen(3000)



//this is geet contributing 

//let port = 3000;

// This is me contributing

// This is me contributing again

// Third contributions

//Plz work

//server.listen(port, () => {
   // console.log(`Listening on port ${port}`);
   // console.log('Hello world!')
//});