import React from 'react';
import {IRowProps} from "../../../interfaces";
import {useAppContext} from "../context/AppContext";

const Grid = () => {
	const {grid} = useAppContext()

	return (
		<article
			className="mx-auto max-w-[600px] h-[600px] grid grid-rows-5 bg-white shadow-lg mb-3"
		>
			{
				grid.map((row: IRowProps[]) => (
					<ul className="w-full h-full flex">
						{
							row.map(({value, found}: IRowProps) =>
								<li
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
