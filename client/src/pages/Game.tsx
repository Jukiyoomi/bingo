import Lobby from "@/components/Lobby";
import Gameboard from "@/components/Gameboard";
import {useEffect} from "react";
import useUsernameStore from "@store/user";
import {useNavigate} from "react-router-dom";
import useStart from "@hooks/useStart";
import socket from "@hooks/useSocket";

const Game = () => {
	const username = useUsernameStore((state) => state.username)
	const navigate = useNavigate()

	const started = useStart()

	const connect = () => {
		socket.connect()
		socket.emit("connection", username)
	}

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
