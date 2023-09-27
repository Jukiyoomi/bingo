import express from "express"
import cors from "cors"
import http from "http";
import ServerSocket from "~/socket";
import path from "path";
import {config} from "dotenv";

config()

const app = express()

const port = process.env.PORT ?? 4000

/** Middlewares */
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
	origin: "*",
	credentials: true,
	methods: ["GET", "POST"],
}))

/** For deployment */
const publicPath = path.join(__dirname, '../client/dist')
app.use(express.static(publicPath))
app.get("*", (_, res) => {
	res.sendFile(path.join(publicPath, 'index.html'))
})

/** Server Handling */
const server = http.createServer(app)

const test = new ServerSocket(server)


/** Listen */
server.listen(port, () => console.log("Server runs yay", publicPath))
