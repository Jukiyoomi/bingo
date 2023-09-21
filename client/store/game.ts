import {create} from 'zustand';
import {devtools, persist} from "zustand/middleware";

interface State {
	started: boolean,
	finished: boolean,
	winner: string,
}

interface Actions {
	setStarted: (started: boolean) => void;
	setFinished: (finished: boolean) => void;
	setWinner: (winner: string) => void;
	start: () => void;
	restart: () => void;
}

const initialState: State = {
	started: false,
	finished: false,
	winner: "",
}

const useGameStateStore = create<State & Actions>()(
	devtools(
		persist((set) => ({
			...initialState,
			setStarted: (started) => set({started}),
			setFinished: (finished) => set({finished}),
			setWinner: (winner) => set({winner}),
			start: () => set({started: true}),
			restart: () => set({...initialState}),
		}), {name: 'username-storage'})
	)
)
export default useGameStateStore;
