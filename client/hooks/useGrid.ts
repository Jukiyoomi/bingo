import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";
import {IRowProps} from "../../interfaces";

const useGrid = (socket: Socket) => {
	const [grid, setGrid] = useState<IRowProps[][]>([])
	const [currentNumber, setCurrentNumber] = useState<number | null>(null)

	const emitNumber = (value: number, index: number) => {
		socket.emit("gotNumber", value, index)
	}

	useEffect(() => {
		socket.on("getGrid", (data: any) => {
			setGrid(data)
		})

		socket.on("getNumber", (data: number) => {
			setCurrentNumber(data)
		})

		socket.on("updateGrid", (data: any) => {
			setGrid(data)
		})

		return () => {
			socket.off("getGrid")
			socket.off("getNumber")
			socket.off("updateGrid")
		}
	}, [socket])


	return {grid, currentNumber, emitNumber}
};

export default useGrid;
