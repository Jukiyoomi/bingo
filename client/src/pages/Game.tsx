import React, {useEffect} from 'react';
import {useAppContext} from "../context/AppContext";
import {useNavigate} from "react-router-dom";

const Game = () => {
	const {username, connect} = useAppContext()
	const navigate = useNavigate()

	useEffect(() => {
		// Either redirect, or connect
		if (!username) navigate("/")
		else connect()
	}, [])

	return (
		<div>
			Game
		</div>
	);
};

export default Game;
