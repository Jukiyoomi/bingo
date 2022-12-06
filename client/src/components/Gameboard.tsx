import React from 'react';
import {useAppContext} from "../context/AppContext";

const Gameboard = () => {
	const {grid} = useAppContext()
	return (
		<div>
			<pre>
				{JSON.stringify(grid, null, 2)}
			</pre>
		</div>
	);
};

export default Gameboard;
