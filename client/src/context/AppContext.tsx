import React, {createContext, useContext, useMemo} from "react";
import {Socket} from "socket.io-client";
import {useSocket} from "../../hooks"

interface IAppContext {
	socket: Socket,
}

const AppContext = createContext<IAppContext | null>(null)

const socketOptions = {
	autoConnect: false,
	reconnection: false,
	withCredentials: true,
	transports: ["websocket"]
}

const AppProvider = ({children}: { children: React.ReactNode }) => {
	console.log(import.meta.env.MODE, window.location.origin)
	const isDev = !!import.meta.env.MODE && import.meta.env.MODE === "development"
	const url = isDev ? "http://localhost:4000" : window.location.origin
	/******************** STATES ********************/
	const socket = useSocket(url, socketOptions)

	/******************** FUNCTIONS ********************/
	/******************** VALUE ********************/
	const value = useMemo(() => ({
		socket,
	}), [socket])

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
