import React, {useEffect} from 'react';
import {IRowProps} from "../../../interfaces";
import {useAppContext} from "../context/AppContext";
import {toast} from "react-toastify";

const Grid = () => {
	const {grid, currentNumber, emitNumber, finished, winner} = useAppContext()

	const clickNumber = (value: number, index: number) => {
		if (!currentNumber) return
		if (currentNumber !== value) return toast.error("This is not the good number...")
		emitNumber(value, index)
	}

	useEffect(() => {
		toast.dismiss()
		if (finished) toast.info(`${winner} completed the grid. Congratulations !`)
	}, [finished])

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
									onClick={() => clickNumber(value, id)}
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
