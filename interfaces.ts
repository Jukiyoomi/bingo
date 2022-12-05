export interface IPlayer {
	username: string,
	role: "chief" | "player",
	socketId: string,
	ready: boolean
}
