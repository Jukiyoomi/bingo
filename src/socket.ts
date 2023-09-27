import {Server as HttpServer} from 'http';
import {Server, Socket} from "socket.io";
import {checkValueInGrid, clearGridList, createGrid} from "~/gameHelpers";
import {IPlayer} from "~common/types";


export default class ServerSocket {
	#io: Server
	#players: IPlayer[]
	#hasStarted: boolean
	#currentNumber: number = 0
	#emitInterval: NodeJS.Timer
	#time: number = 5000
	#maxValue: number = 50

	constructor(server: HttpServer) {
		this.hasStarted = false
		this.players = []
		this.io = new Server(server, {
			serveClient: false,
			cookie: false,
			cors: {
				origin: "*",
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

	get hasStarted(): boolean {
		return this.#hasStarted;
	}

	set hasStarted(value: boolean) {
		this.#hasStarted = value;
	}

	get currentNumber(): number {
		return this.#currentNumber;
	}

	set currentNumber(value: number) {
		this.#currentNumber = value;
	}

	get emitInterval(): NodeJS.Timer {
		return this.#emitInterval;
	}

	set emitInterval(value: NodeJS.Timer) {
		this.#emitInterval = value;
	}

	get time(): number {
		return this.#time;
	}

	get maxValue(): number {
		return this.#maxValue;
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

			const removingPlayer = this.players.find(player => player.socketId === socket.id)

			// Remove the player from the list
			this.players = this.players.filter(player => player.socketId !== socket.id)

			// Set a new chief if the player to be removed is the chief
			if (this.players.length > 0) {
				if (removingPlayer && removingPlayer.role === "chief") {
					this.players[0].role = "chief"
				}
			} else {
				this.hasStarted = false
				clearInterval(this.emitInterval)
			}

			this.io.emit("newPlayer", this.players)
		})

		socket.on("getReady", () => {
			this.players = this.players.map(player => {
				if (player.socketId === socket.id) {
					player.ready = true
				}
				return player
			})
			console.log("Number of ready players:", this.players.filter(player => player.ready).length, "/", this.players.length)
			this.io.emit("getReady", this.players)
		})

		socket.on("startGame", () => {
			this.hasStarted = true
			this.io.emit("start")
			this.players.forEach(player => {
				const newGrid = createGrid(player.socketId, this.maxValue)
				this.io.to(player.socketId).emit("getGrid", newGrid)
			})
			console.log("game started")
			this.GenerateNumberInterval()
		})

		socket.on("gotNumber", (value: number, index: number) => {
			const {grid, completed} = checkValueInGrid(socket.id, value, index)
			socket.emit("updateGrid", grid)

			if (completed) {
				const player = this.players.find(player => player.socketId === socket.id)!
				this.io.emit("victory", player.username)
				console.log("victory of", player.username)
				clearInterval(this.emitInterval)

				setTimeout(() => {
					clearGridList()
					this.currentNumber = 0
					this.io.emit("restart")
				}, 20000)
			}
		})

	}

	// TODO: clear interval somehow
	GenerateNumberInterval = () => {
		this.EmitRandomNumber()

		this.emitInterval = setInterval(this.EmitRandomNumber, this.time)
	}

	EmitRandomNumber = () => {
		this.currentNumber++
		this.io.emit("getNumber", this.currentNumber)
	}
}
