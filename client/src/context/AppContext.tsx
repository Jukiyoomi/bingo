import React, {createContext, useContext, useMemo} from "react";

interface IAppContext {

}

const AppContext = createContext<IAppContext | null>(null)

const AppProvider = ({children}: { children: React.ReactNode }) => {
	/******************** STATES ********************/

	/******************** FUNCTIONS ********************/

	/******************** VALUE ********************/
	const value = useMemo(() => ({}), [])

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
