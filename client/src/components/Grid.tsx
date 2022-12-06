import React from 'react';
import {IRowProps} from "../../../interfaces";
import {useAppContext} from "../context/AppContext";
import {toast} from "react-toastify";

const Grid = () => {
	const {grid, currentNumber, emitNumber} = useAppContext()

	const clickNumber = (value: number) => {
		if (!currentNumber) return
		if (currentNumber !== value) return toast.error("This is not the good number...")
		emitNumber(value)
	}

	return (
		<article
			className="mx-auto max-w-[600px] h-[600px] grid grid-rows-5 bg-white shadow-lg mb-3"
		>
			{
				grid.map((row: IRowProps[], id) => (
					<ul className="w-full h-full flex" key={id}>
						{
							row.map(({value, found}: IRowProps) =>
								<li
									onClick={() => clickNumber(value)}
									key={value}
									value={value}
									className={`flex-1 flex justify-center items-center border cursor-pointer transition hover:bg-gray-400 
											${found && "bg-blue-500 text-white pointer-events-none"}`}
								>
									{value}
								</li>
							)
						}
					</ul>
				))
			}
		</article>
	);
};

export default Grid;
