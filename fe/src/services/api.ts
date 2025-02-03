export async function startGameRequest(data: {
	fieldSize: number;
	diamondsCount: number;
}) {
	const response = await fetch('http://localhost:8081/game', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
}
