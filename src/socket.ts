import {Server as HttpServer} from 'http';
import {Server, Socket} from "socket.io";

interface IPlayer {
	username: string,
	role: "chief" | "player",
	socketId: string,
	ready: boolean
}

export default class ServerSocket {
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

	private _io: Server

	get io(): Server {
		return this._io;
	}

	set io(value: Server) {
		this._io = value;
	}

	private _players: IPlayer[]

	get players(): IPlayer[] {
		return this._players;
	}

	set players(value: IPlayer[]) {
		this._players = value;
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
			this.players = [...this._players, newPlayer]
		})

		socket.on("disconnect", () => {
			console.log("user disconnected", socket.id)

			// Remove the player from the list
			this.players = this.players.filter(player => player.socketId === socket.id)
		})
	}
}
