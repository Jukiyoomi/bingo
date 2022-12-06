import React from 'react';
import {useAppContext} from "../context/AppContext";
import Grid from "./Grid";

const Gameboard = () => {
	const {players, currentNumber} = useAppContext()
	return (
		<section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<p className="text-center font-bold text-xl">The number to mark is {currentNumber}</p>

			<Grid/>

			<p className="text-center">{players.length} players in game.</p>
		</section>
	);
};

export default Gameboard;
