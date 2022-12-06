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

interface iGrids {
	[key: string]: string
}

let grids: iGrids = {}

export const createGrid = (id: string): IGrid => {
	const max = 25
	const arr: IGridNumber[] = [];
	while (arr.length < max) {
		const r: IGridNumber = {
			value: Math.floor(Math.random() * 90) + 1,
			found: false
		};
		const index = arr.findIndex(value => value.value === r.value)

		if (index === -1) arr.push(r);
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
	grids = {
		...grids,
		[id]: JSON.stringify(grid)
	}
	return grid
}

