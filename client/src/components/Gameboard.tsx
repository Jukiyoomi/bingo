import React, {useEffect} from 'react';
import {useAppContext} from "../context/AppContext";
import Grid from "./Grid";
import {toast} from "react-toastify";

const Gameboard = () => {
	const {players, currentNumber, finished, winner} = useAppContext()

	useEffect(() => {
		toast.dismiss()
		if (finished) toast.info(`${winner} completed the grid. Congratulations !`)
	}, [finished])

	return (
		<section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<p className="text-center font-bold text-xl">The number to mark is {currentNumber}</p>

			<Grid/>

			<p className="text-center">{players.length} players in game.</p>
		</section>
	);
};

export default Gameboard;
