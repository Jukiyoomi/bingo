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

export interface IGridNumber {
	value: number,
	found: boolean
}

export type IGrid<T> = [
		T[] | [],
		T[] | [],
		T[] | [],
		T[] | [],
		T[] | []
]

export interface IGrids {
	[key: string]: string
}
