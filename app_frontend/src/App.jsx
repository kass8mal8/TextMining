import { Routes, Route } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import Home from "./components/home/Home";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;
