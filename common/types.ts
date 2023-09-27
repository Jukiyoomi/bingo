export interface IPlayer {
	username: string,
	role: "chief" | "player",
	socketId: string,
	ready: boolean
}


export interface IRowProps {
	value: number,
	found: boolean
}
