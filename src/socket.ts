import {Server as HttpServer} from 'http';
import {Server, Socket} from "socket.io";

interface IPlayer {
	username: string,
	role: string,
	socketId: string
}

export default class ServerSocket {
	constructor(server: HttpServer) {
		this._players = []
		this._io = new Server(server, {
			serveClient: false,
			cookie: false,
			cors: {
				origin: "http://127.0.0.1:5173",
				credentials: true,
				methods: ["GET", "POST"],
			},
		})
		this._io.on("connect", this.StartListeners)
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
		})

		socket.on("disconnect", () => {
			console.log("user disconnected", socket.id)
		})
	}
}
