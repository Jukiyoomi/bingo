import {create} from 'zustand';
import {devtools, persist} from "zustand/middleware";
import {IRowProps} from "../../interfaces";

interface State {
	grid: IRowProps[][],
	currentNumber: number | null,
}

interface Actions {
	// emitNumber: (value: number, index: number) => void;
	setGrid: (grid: IRowProps[][]) => void;
	setCurrentNumber: (number: number | null) => void;
}

const initialState: State = {
	grid: [],
	currentNumber: null,
}

const useGridStore = create<State & Actions>()(
	devtools(
		persist((set) => ({
			...initialState,
			setGrid: (grid) => set({grid}),
			setCurrentNumber: (currentNumber) => set({currentNumber}),
		}), {name: 'grid-storage'})
	)
)
export default useGridStore;
