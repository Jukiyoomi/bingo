interface IGridNumber {
	value: number,
	found: boolean
}

type IGrid<T> = [
		T[] | [],
		T[] | [],
		T[] | [],
		T[] | [],
		T[] | []
]

interface IGrids {
	[key: string]: string
}

let grids: IGrids = {}

export const createGrid = (id: string): IGrid<IGridNumber> => {
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

	let grid: IGrid<IGridNumber> = [[], [], [], [], []]

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

export const checkValueInGrid = (id: string, value: number, index: number) => {
	// the grid in the list of all grids is a string, so have to parse it to array
	const correspondingGrid: IGrid<IGridNumber> = JSON.parse(grids[id])

	// get {index}th row
	const currentRow: IGridNumber[] = correspondingGrid[index]

	for (const gridNumber of currentRow) {
		if (gridNumber.value === value) {
			gridNumber.found = true
			break
		}
	}

	grids[id] = JSON.stringify(correspondingGrid)

	return correspondingGrid
}

