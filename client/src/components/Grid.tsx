import React from 'react';
import {IRowProps} from "../../../interfaces";
import useVictory from "../../hooks/useVictory";
import useGrid from "../../hooks/useGrid";

const Grid = () => {

	const {finished, winner} = useVictory();
	const {grid, clickNumber} = useGrid();

	return (
		<article
			className={`mx-auto max-w-[600px] h-[600px] grid grid-rows-5 bg-white shadow-lg mb-3 ${finished || winner ? "pointer-events-none select-none" : null}`}
		>
			{
				grid.map((row: IRowProps[], id) => (
					<GridRow row={row} rowId={id} clickNumber={clickNumber} key={id}/>
				))
			}
		</article>
	);
};

function GridRow({row, rowId, clickNumber}: {
	row: IRowProps[],
	rowId: number,
	clickNumber: (value: number, rowId: number) => void
}) {
	return (
		<ul className="w-full h-full flex">
			{
				row.map(({value, found}: IRowProps) =>
					<li
						onClick={() => clickNumber(value, rowId)}
						key={value}
						value={value}
						className={`flex-1 flex justify-center items-center border text-2xl cursor-pointer transition hover:bg-gray-400 
											${found ? "bg-blue-500 text-white pointer-events-none" : null}`}
					>
						{value}
					</li>
				)
			}
		</ul>
	)
}

export default Grid;
