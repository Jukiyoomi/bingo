import React, {useEffect} from 'react';
import {IRowProps} from "../../../interfaces";
import {useAppContext} from "../context/AppContext";
import {toast} from "react-toastify";
import useGameStateStore from "../../store/game";
import useGridStore from "../../store/grid";

const Grid = () => {
	const {socket} = useAppContext()
	const [finished, setFinished, winner, setWinner] = useGameStateStore((state) => ([
		state.finished,
		state.setFinished,
		state.winner,
		state.setWinner
	]))
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
		toast.dismiss()
		if (finished) toast.success(`${winner} completed the grid. Congratulations !`)
	}, [finished])

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

		socket.on("victory", (data: string) => {
			console.log("victory", data)
			setFinished(true)
			setWinner(data)
		})

		return () => {
			socket.off("getGrid")
			socket.off("getNumber")
			socket.off("updateGrid")
			socket.off("victory")
		}
	}, [socket])

	return (
		<article
			className={`mx-auto max-w-[600px] h-[600px] grid grid-rows-5 bg-white shadow-lg mb-3 ${finished || winner ? "pointer-events-none select-none" : null}`}
		>
			{
				grid.map((row: IRowProps[], id) => (
					<ul className="w-full h-full flex" key={id}>
						{
							row.map(({value, found}: IRowProps) =>
								<li
									onClick={() => clickNumber(value, id)}
									key={value}
									value={value}
									className={`flex-1 flex justify-center items-center border text-2xl cursor-pointer transition hover:bg-gray-400 
											${found ? "bg-blue-500 text-white pointer-events-none" : null}`}
								>
									{value}
								</li>
							)
						}
					</ul>
				))
			}
		</article>
	);
};

export default Grid;
