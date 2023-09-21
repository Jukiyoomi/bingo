import React, {useEffect} from 'react';
import {useAppContext} from "../context/AppContext";
import Button from "../components/Button";
import Players from "../components/Players";
import usePlayersStore from "../../store/players";

const Lobby = () => {
	const {socket} = useAppContext()
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

	return (
		<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">Lobby</h1>

				<p className="mt-4 text-gray-500">
					Waiting for other players... {players.length} has joined.
				</p>
			</div>

			<div className="max-w-[800px] mx-auto mt-8 mb-0 flex flex-col items-start gap-4">
				<Players/>
				<div className="flex items-center justify-end">
					{currentPlayer && currentPlayer.ready ?
						(
							currentPlayer.role === "chief" &&
							<Button
								onClick={startGame}
								className={players.every(player => player.ready) ? "" : "pointer-events-none bg-gray-400"}>
								Start The Game
							</Button>
						)
						:
						<Button onClick={onReadyClick}>
							Get Ready
						</Button>
					}
				</div>
			</div>
		</div>
	);
};

export default Lobby;
