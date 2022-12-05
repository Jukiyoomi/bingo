import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";

const useOnEmission = (socket: Socket) => {
	const [players, setPlayers] = useState<any[]>([])

	useEffect(() => {
		socket.on("newPlayer", (data: any) => setPlayers(data))

		return () => {
			socket.off("newPlayer")
		}
	}, [socket])

	return {players}
};

export default useOnEmission;
