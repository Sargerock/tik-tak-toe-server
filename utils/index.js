const winCases = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export const checkWinner = (field) => {
	return winCases.some(([a, b, c]) =>
		(field[a] && field[a] === field[b] && field[a] === field[c])
	);
}

export const getRandomPosition = (field) => {
	const availablePositions = field.reduce((acc, cur, index) => {
		if (!cur) {
			return [...acc, index];
		} else {
			return acc;
		}
	}, []);
	const randomPosition = Math.floor(Math.random() * availablePositions.length);
	return availablePositions[randomPosition];
}