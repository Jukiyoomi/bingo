import Lobby from "../components/Lobby";
import {useAppContext} from "../context/AppContext";
import Gameboard from "../components/Gameboard";
import {useEffect} from "react";
import useUsernameStore from "../../store/user";
import useGameStateStore from "../../store/game";
import {useNavigate} from "react-router-dom";

const Game = () => {
	const {socket} = useAppContext()
	const username = useUsernameStore((state) => state.username)
	const navigate = useNavigate()
	const [started, start, restart] = useGameStateStore((state) => ([
		state.started,
		state.start,
		state.restart
	]))

	const connect = () => {
		socket.connect()
		socket.emit("connection", username)
	}

	useEffect(() => {
		// Either redirect, or connect
		if (!username) navigate("/")
		else connect()
	}, [])

	useEffect(() => {
		socket.on("start", () => {
			start()
		})

		socket.on("restart", () => {
			restart()
		})

		return () => {
			socket.off("start")
			socket.off("restart")
		}
	}, [socket])

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
