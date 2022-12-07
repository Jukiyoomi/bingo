import React from 'react';
import {FaUser} from "react-icons/fa";

interface IPlayer {
	username: string,
	role: "chief" | "player",
	ready: boolean
}

const Player = ({player: {username, role, ready}}: { player: IPlayer }) => {
	return (
		<article
			className={`bg-white w-fit p-5 rounded shadow flex items-center justify-between gap-4 border-l-4
				${ready ? "border-[green]" : "border-[crimson]"}
			`}>
			<div className="flex items-center gap-3">
				<FaUser color={ready ? "green" : "crimson"}/>
				<h1 className="text-lg font-bold">{username}</h1>
			</div>
			<p>{role}</p>
		</article>
	);
};

export default Player;
