import React, {createContext, useContext, useMemo} from "react";
import useUsername from "../../hooks/useUsername";
import useSocket from "../../hooks/useSocket";
import {Socket} from "socket.io-client";

interface IAppContext {
	username: string | null,
	setUsername: React.Dispatch<React.SetStateAction<string | null>>,
	socket: Socket
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

	/******************** FUNCTIONS ********************/

	/******************** VALUE ********************/
	const value = useMemo(() => ({
		username,
		setUsername,
		socket
	}), [username])

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
