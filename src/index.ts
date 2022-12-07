import express from "express"
import cors from "cors"
import http from "http";
import ServerSocket from "~/socket";

const app = express()

/** Middlewares */
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

/** Server Handling */
const server = http.createServer(app)

new ServerSocket(server)

/** Listen */
server.listen(4000, () => console.log("Server runs"))
