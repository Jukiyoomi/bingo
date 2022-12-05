import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";

const usePlayers = (socket: Socket) => {
	const [players, setPlayers] = useState<any[]>([])
	const [currentPlayer, setCurrentPlayer] = useState<any>(null)

	useEffect(() => {
		socket.on("newPlayer", (data: any[]) => {
			setPlayers(data)
			const player = data?.find(player => player.socketId === socket.id)
			setCurrentPlayer(player)
		})

		socket.on("getReady", (data: any[]) => {
			setPlayers(data)
		})


		return () => {
			socket.off("newPlayer")
			socket.off("getReady")
		}
	}, [socket])


	return {players, currentPlayer, setCurrentPlayer}
};

export default usePlayers;
