import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Register/>}/>
				<Route path="/game"/>
			</Routes>
		</Router>
	)
}

export default App
