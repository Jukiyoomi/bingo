import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";
import {IPlayer} from "../../interfaces";

const usePlayers = (socket: Socket) => {
	const [players, setPlayers] = useState<IPlayer[]>([])
	const [currentPlayer, setCurrentPlayer] = useState<IPlayer | null>(null)

	useEffect(() => {
		socket.on("newPlayer", (data: typeof players) => {
			setPlayers(data)
			const player = data.find(player => player.socketId === socket.id)!
			setCurrentPlayer(player)
		})

		socket.on("getReady", (data: typeof players) => {
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
