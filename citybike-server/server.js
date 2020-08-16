const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach"



const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();


app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
let interval;

io.on("connection", socket => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  console.log('New connection ' + socketId + ' from ' + clientIp);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
  
});
const getApiAndEmit = socket => {
    axios.get(
      citybikeurl
    ).then(res => {
      const data = res.data.network
      socket.emit("FromAPI", data);
    })
  
};
server.listen(port, () => console.log(`Listening on port ${port}`));