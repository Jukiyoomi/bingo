interface IGridNumber {
	value: number,
	found: boolean
}

type IGrid = [
		IGridNumber[] | [],
		IGridNumber[] | [],
		IGridNumber[] | [],
		IGridNumber[] | [],
		IGridNumber[] | []
]

export const createGrid = (): IGrid => {
	const max = 25
	const arr: IGridNumber[] = [];
	while (arr.length < max) {
		const r: IGridNumber = {
			value: Math.floor(Math.random() * 100) + 1,
			found: false
		};
		if (arr.indexOf(r) === -1) arr.push(r);
	}

	let grid: IGrid = [[], [], [], [], []]

	for (let i = 0; i < arr.length; i++) {
		if (i % 5 === 0) {
			const currentIndexOfGrid = i / 5

			grid[currentIndexOfGrid] = arr
				.slice(i, i + 5)
				.sort((a: IGridNumber, b: IGridNumber) => a.value - b.value)
		}

	}
	return grid
}
