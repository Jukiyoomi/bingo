import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";

const useStart = (socket: Socket) => {
	const [started, setStarted] = useState<boolean>(false)

	useEffect(() => {
		socket.on("start", () => {
			setStarted(true)
		})

		return () => {
			socket.off("start")
		}
	}, [socket])


	return {started, setStarted}
};

export default useStart;
