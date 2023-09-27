import useGameStateStore from "../store/game";
import {useEffect} from "react";
import socket from "./useSocket";

const useStart = () => {
	const [started, start, restart] = useGameStateStore((state) => ([
		state.started,
		state.start,
		state.restart
	]))

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

	return started

};

export default useStart;
