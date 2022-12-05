import Lobby from "../components/Lobby";
import {useAppContext} from "../context/AppContext";
import Gameboard from "../components/Gameboard";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Game = () => {
	const {started, username, connect} = useAppContext()
	const navigate = useNavigate()

	useEffect(() => {
		// Either redirect, or connect
		if (!username) navigate("/")
		else connect()
	}, [])

	return (
		<>
			{
				started ?
					<Gameboard/> :
					<Lobby/>
			}
		</>
	);
};

export default Game;
