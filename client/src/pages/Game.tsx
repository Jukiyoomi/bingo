import React, {useEffect} from 'react';
import {useAppContext} from "../context/AppContext";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button";
import Players from "../components/Players";

const Game = () => {
	const {username, connect, players, getReady, currentPlayer} = useAppContext()
	const navigate = useNavigate()

	useEffect(() => {
		// Either redirect, or connect
		if (!username) navigate("/")
		else connect()
	}, [])


	return (
		<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">Lobby</h1>

				<p className="mt-4 text-gray-500">
					Waiting for other players... {players.length} has joined.
				</p>
			</div>

			<div className="max-w-[800px] mx-auto mt-8 mb-0 max-w-md flex flex-col items-start gap-4">
				<Players/>
				<div className="flex items-center justify-end">
					{currentPlayer && currentPlayer.ready ?
						(
							currentPlayer.role === "chief" &&
							<Button
								className={players.every(player => player.ready) ? "" : "pointer-events-none bg-gray-400"}>
								Start The Game
							</Button>
						)
						:
						<Button onClick={getReady}>
							Get Ready
						</Button>
					}
				</div>
			</div>
		</div>
	);
};

export default Game;
