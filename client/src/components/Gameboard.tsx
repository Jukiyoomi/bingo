import React from 'react';
import Grid from "./Grid";
import usePlayersStore from "../../store/players";
import useGridStore from "../../store/grid";

const Gameboard = () => {
	const currentNumber = useGridStore((state) => (state.currentNumber))
	const players = usePlayersStore((state) => state.players)

	return (
		<section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<p className="text-center font-bold text-xl">The number to mark is {currentNumber}</p>

			<Grid/>

			<p className="text-center">{players.length} players in game.</p>
		</section>
	);
};

export default Gameboard;
