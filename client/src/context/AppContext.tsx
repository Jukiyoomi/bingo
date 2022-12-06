import React, {createContext, useContext, useMemo} from "react";
import {Socket} from "socket.io-client";
import {IPlayer, IRowProps} from "../../../interfaces";
import {useGrid, usePlayers, useSocket, useStart, useUsername} from "../../hooks"

interface IAppContext {
	username: string | null,
	setUsername: React.Dispatch<React.SetStateAction<string | null>>,
	socket: Socket,
	connect: () => void,
	getReady: () => void,
	players: IPlayer[],
	currentPlayer: IPlayer | null,
	started: boolean,
	setStarted: React.Dispatch<React.SetStateAction<boolean>>,
	startGame: () => void,
	grid: IRowProps[][]
}

const AppContext = createContext<IAppContext | null>(null)

const socketOptions = {
	autoConnect: false,
	reconnection: false,
	withCredentials: true,
}

const AppProvider = ({children}: { children: React.ReactNode }) => {
	/******************** STATES ********************/
	const {username, setUsername} = useUsername()
	const socket = useSocket("http://localhost:4000", socketOptions)
	const {players, currentPlayer, setCurrentPlayer} = usePlayers(socket)
	const {started, setStarted} = useStart(socket)
	const {grid} = useGrid(socket)

	/******************** FUNCTIONS ********************/
	const connect = () => {
		socket.connect()
		socket.emit("connection", username)
	}

	const getReady = () => {
		socket.emit("getReady")
		setCurrentPlayer({
			...currentPlayer!,
			ready: true
		})
	}

	const startGame = () => {

		socket.emit("startGame")
	}
	/******************** VALUE ********************/
	const value = useMemo(() => ({
		username,
		setUsername,
		socket,
		connect,
		players,
		getReady,
		currentPlayer,
		started,
		setStarted,
		startGame,
		grid
	}), [username, socket, players, currentPlayer, started, grid])

	/******************** RETURN ********************/
	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext) as IAppContext
}

export default AppProvider;
