import useGameStateStore from "@store/game";
import {useEffect} from "react";
import {toast} from "react-toastify";
import socket from "./useSocket";

const useVictory = () => {
	const [finished, setFinished, winner, setWinner] = useGameStateStore((state) => ([
		state.finished,
		state.setFinished,
		state.winner,
		state.setWinner
	]))

	useEffect(() => {
		toast.dismiss()
		if (finished) {
			toast.success(`${winner} completed the grid. Congratulations !`)
			toast.info("Restarting the game soon... Please wait !", {
				autoClose: 18000
			})
		}
	}, [finished])

	useEffect(() => {

		socket.on("victory", (data: string) => {
			console.log("victory", data)
			setFinished(true)
			setWinner(data)
		})

		return () => {
			socket.off("victory")
		}
	}, [socket])

	return {
		finished,
		winner
	}
};

export default useVictory;
