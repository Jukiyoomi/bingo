import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";

const useVictory = (socket: Socket) => {
	const [finished, setFinished] = useState<boolean>(false)
	const [winner, setWinner] = useState<string>("")

	useEffect(() => {
		socket.on("victory", (data: string) => {
			setFinished(true)
			setWinner(data)
		})

		return () => {
			socket.off("victory")
		}
	}, [socket])


	return {finished, winner}
};

export default useVictory;
