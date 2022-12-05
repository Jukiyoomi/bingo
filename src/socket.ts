import {Server as HttpServer} from 'http';
import {Server, Socket} from "socket.io";
import {IPlayer} from "~~/interfaces";

interface IPlayer {
	username: string,
	role: "chief" | "player",
	socketId: string,
	ready: boolean
}

export default class ServerSocket {
	#io: Server
	#players: IPlayer[]

	constructor(server: HttpServer) {
		this.players = []
		this.io = new Server(server, {
			serveClient: false,
			cookie: false,
			cors: {
				origin: "http://127.0.0.1:5173",
				credentials: true,
				methods: ["GET", "POST"],
			},
		})
		this.io.on("connect", this.StartListeners)
	}

	get io(): Server {
		return this.#io;
	}

	set io(value: Server) {
		this.#io = value;
	}

	get players(): IPlayer[] {
		return this.#players;
	}

	set players(value: IPlayer[]) {
		this.#players = value;
	}

	StartListeners = (socket: Socket) => {
		socket.on("connection", (data: string) => {
			console.log("user connected", socket.id, data)

			// Create new player and add it to the list
			const newPlayer: IPlayer = {
				username: data,
				role: this.players.length === 0 ? "chief" : "player",
				socketId: socket.id,
				ready: false
			}
			this.players = [...this.players, newPlayer]
			this.io.emit("newPlayer", this.players)
		})

		socket.on("disconnect", () => {
			console.log("user disconnected", socket.id)

			// Remove the player from the list
			this.players = this.players.filter(player => player.socketId !== socket.id)
			this.io.emit("newPlayer", this.players)
		})

		socket.on("getReady", () => {
			this.players = this.players.map(player => {
				if (player.socketId === socket.id) {
					player.ready = true
				}
				return player
			})
			this.io.emit("getReady", this.players)
		})
	}
}
