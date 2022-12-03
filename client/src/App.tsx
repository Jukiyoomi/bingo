import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Game from "./pages/Game";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Register/>}/>
				<Route path="/game" element={<Game/>}/>
			</Routes>
		</Router>
	)
}

export default App
