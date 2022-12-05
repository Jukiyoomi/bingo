import React, {createContext, useContext, useMemo} from "react";
import useUsername from "../../hooks/useUsername";

interface IAppContext {
	username: string | null,
	setUsername: React.Dispatch<React.SetStateAction<string | null>>
}

const AppContext = createContext<IAppContext | null>(null)

const AppProvider = ({children}: { children: React.ReactNode }) => {
	/******************** STATES ********************/
	const {username, setUsername} = useUsername()
	/******************** FUNCTIONS ********************/

	/******************** VALUE ********************/
	const value = useMemo(() => ({
		username,
		setUsername
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
