import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";

const useGrid = (socket: Socket) => {
	const [grid, setGrid] = useState<any[]>([])

	useEffect(() => {
		socket.on("getGrid", (data: any) => {
			setGrid(data)
		})

		return () => {
			socket.off("getGrid")
		}
	}, [socket])


	return {grid}
};

export default useGrid;
