const express = require('express');
const port = 8080;

const crawl = require("./crawl/index.js")

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'))

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(path.join(__dirname + '/index.html'));
})

io.on("connection", socket => {
  console.log("user connected!");
  
  // socket.emit('request', /* … */); // emit an event to the socket
  // io.emit('broadcast', /* … */); // emit an event to all connected sockets
  // listen to the event
  socket.on('message', async message => { 
    console.log("message: ", message)
    const data = await crawl(message.url);
    // console.log(data)
    socket.send(data);
  }); 
  socket.on("disconnect", () => {
    console.log("a user diconnected");
  })
})

http.listen(port, "127.0.0.1");

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })