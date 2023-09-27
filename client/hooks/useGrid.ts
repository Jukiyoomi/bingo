import useGridStore from "@store/grid";
import {toast} from "react-toastify";
import {useEffect} from "react";
import socket from "./useSocket";

const useGrid = () => {
	const [grid, currentNumber, setGrid, setCurrentNumber] = useGridStore((state) => ([
		state.grid,
		state.currentNumber,
		state.setGrid,
		state.setCurrentNumber
	]))

	const emitNumber = (value: number, index: number) => {
		socket.emit("gotNumber", value, index)
	}

	const clickNumber = (value: number, index: number) => {
		if (!currentNumber) return
		if (currentNumber !== value) return toast.error("This is not the good number...")
		emitNumber(value, index)
	}

	useEffect(() => {
		socket.on("getGrid", (data: any) => {
			setGrid(data)
		})

		socket.on("getNumber", (data: number) => {
			toast.info("New number !", {
				autoClose: 1000
			})
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

	return {
		grid,
		currentNumber,
		clickNumber
	}
};

export default useGrid;
