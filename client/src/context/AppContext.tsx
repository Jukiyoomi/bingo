import React, {createContext, useContext, useMemo} from "react";
import {Socket} from "socket.io-client";
import {IPlayer, IRowProps} from "../../../interfaces";
import {useGrid, usePlayers, useSocket, useStart, useUsername} from "../../hooks"
import useVictory from "../../hooks/useVictory";

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
	grid: IRowProps[][],
	currentNumber: number | null,
	emitNumber: (value: number, index: number) => void,
	finished: boolean,
	winner: string,
}

const AppContext = createContext<IAppContext | null>(null)

const socketOptions = {
	autoConnect: false,
	reconnection: false,
	withCredentials: true,
	transports: ["websocket"]
}

const AppProvider = ({children}: { children: React.ReactNode }) => {
	/******************** STATES ********************/
	const {username, setUsername} = useUsername()
	const socket = useSocket("https://bingo-wilfrite.vercel.app/", socketOptions)
	const {players, currentPlayer, setCurrentPlayer} = usePlayers(socket)
	const {started, setStarted} = useStart(socket)
	const {grid, currentNumber, emitNumber} = useGrid(socket)
	const {finished, winner, setFinished, setWinner} = useVictory(socket)

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

	socket.on("restart", () => {
		setStarted(false)
		setFinished(false)
		setWinner("")
	})
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
		grid,
		currentNumber,
		emitNumber,
		finished,
		winner
	}), [username, socket, players, currentPlayer, started, grid, currentNumber, finished, winner])

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
