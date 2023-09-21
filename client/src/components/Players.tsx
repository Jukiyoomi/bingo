import React from 'react';
import Player from "./Player";
import usePlayersStore from "../../store/players";

const Players = () => {
	const players = usePlayersStore((state) => state.players)
	return (
		<div className="flex-1 w-full flex-wrap flex gap-3">
			{players.map((player, id) => <Player player={player} key={id}/>)}
		</div>
	);
};

export default Players;
