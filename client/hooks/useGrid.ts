import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";
import {IRowProps} from "../../interfaces";

const useGrid = (socket: Socket) => {
	const [grid, setGrid] = useState<IRowProps[][]>([])

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
