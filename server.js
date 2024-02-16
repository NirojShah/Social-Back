const http = require("http")
const dotenv = require("dotenv")
const app = require("./app")
const {
    default: mongoose
} = require("mongoose")
const {
    Server
} = require("socket.io")



dotenv.config({
    path: ".env"
})
let mongodbPath = process.env.MONGO_LOCAL
let port = process.env.PORT
const server = http.createServer(app)
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173"
    }
})

mongoose.connect(mongodbPath).then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY")
}).catch((err) => {
    console.log("ERROR WHILE CONNECTING TO DATABASE")
})




io.on("connection", socket => {
    console.log("conn")
    socket.on("joined chat",(room)=>{
        socket.join(room)
    })
    socket.on("send_message", data => {
        socket.in(data.id).emit("recieved_message",{msg:data.msg,userId:data.userId})
    })
})


server.listen(port, (err) => {
    if (err) {
        console.log("something went wrong")
    } else {
        console.log(`SERVER STARTED AT ${port}....`)
    }
})