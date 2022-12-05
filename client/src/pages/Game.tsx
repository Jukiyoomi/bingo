import Lobby from "../components/Lobby";
import {useAppContext} from "../context/AppContext";
import Gameboard from "../components/Gameboard";

const Game = () => {
	const {started} = useAppContext()

	return (
		<>
			{
				started ?
					<Gameboard/> :
					<Lobby/>
			}
		</>
	);
};

export default Game;
