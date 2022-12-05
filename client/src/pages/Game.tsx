import React, {useEffect} from 'react';
import {useAppContext} from "../context/AppContext";
import {useNavigate} from "react-router-dom";

const Game = () => {
	const {socket, username} = useAppContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (!username) navigate("/")
	}, [])

	useEffect(() => {
		socket.connect()
	}, [])

	return (
		<div>
			Game
		</div>
	);
};

export default Game;
