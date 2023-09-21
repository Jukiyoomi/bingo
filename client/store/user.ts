import {create} from 'zustand';
import {devtools, persist} from "zustand/middleware";

interface State {
	username: string | null,
}

interface Actions {
	setUsername: (username: string | null) => void;
}

const initialState: State = {
	username: null,
}

const useUsernameStore = create<State & Actions>()(
	devtools(
		persist((set) => ({
			...initialState,
			setUsername: (username) => set({username}),
		}), {name: 'username-storage'})
	)
)
export default useUsernameStore;
