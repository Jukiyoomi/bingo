import React from 'react';
import {useAppContext} from "../context/AppContext";
import Player from "./Player";

const Players = () => {
	const {players} = useAppContext()
	return (
		<div className="flex-1 flex-wrap flex gap-3">
			{players.map((player, id) => <Player player={player} key={id}/>)}
		</div>
	);
};

export default Players;
