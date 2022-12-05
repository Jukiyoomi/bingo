import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Game from "./pages/Game";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Register/>}/>
				<Route path="/game" element={<Game/>}/>
			</Routes>
			<ToastContainer/>
		</Router>
	)
}

export default App
