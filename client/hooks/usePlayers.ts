import socket from "./useSocket";
import usePlayersStore from "../store/players";
import {useEffect} from "react";

const usePlayers = () => {

	const [players, currentPlayer, newPlayer, getReady] = usePlayersStore((state) => ([
		state.players,
		state.currentPlayer,
		state.newPlayer,
		state.getReady
	]))

	const onReadyClick = () => {
		socket.emit("getReady")
	}

	const startGame = () => {
		socket.emit("startGame")
	}

	useEffect(() => {
		socket.on("newPlayer", (data: typeof players) => {
			newPlayer(data, socket.id)
		})

		socket.on("getReady", (data: typeof players) => {
			getReady(data)
		})

		return () => {
			socket.off("newPlayer")
			socket.off("getReady")
		}
	}, [])

	return {
		players,
		currentPlayer,
		onReadyClick,
		startGame
	}
};

export default usePlayers;
