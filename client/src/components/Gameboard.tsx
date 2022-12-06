import React from 'react';
import {useAppContext} from "../context/AppContext";
import Grid from "./Grid";

const Gameboard = () => {
	const {players} = useAppContext()
	return (
		<section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<Grid/>

			<p className="text-center">{players.length} players in game.</p>
		</section>
	);
};

export default Gameboard;
