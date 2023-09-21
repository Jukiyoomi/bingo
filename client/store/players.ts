import {create} from 'zustand';
import {devtools, persist} from "zustand/middleware";
import {IPlayer} from "../../interfaces";

interface State {
	players: IPlayer[],
	currentPlayer: IPlayer | null,
}

interface State2 {
	currentPlayer: IPlayer | null,
}

interface Actions {
	setCurrentPlayer: (player: IPlayer) => void;
	setPlayers: (player: IPlayer[]) => void;
	newPlayer: (player: IPlayer[], socketId: string) => void;
	getReady: (player: IPlayer[]) => void;
}

const initialState: State = {
	players: [],
	currentPlayer: null,
}

const usePlayersStore = create<State & Actions>()(
	devtools(
		persist((set, get) => ({
			...initialState,
			setCurrentPlayer: (player) => set({currentPlayer: player}),
			setPlayers: (players) => set({players}),
			newPlayer: (data, socketId) => {
				get().setPlayers(data)
				const player = data.find(player => player.socketId === socketId)!
				get().setCurrentPlayer(player)
			},
			getReady: (data) => {
				get().setPlayers(data)
				// Find the current player and set it on every getReady signal
				const player = data.find(player => player.socketId === get().currentPlayer!.socketId)!
				get().setCurrentPlayer(player)
			}
		}), {name: 'players-storage'})
	)
)
export default usePlayersStore;
