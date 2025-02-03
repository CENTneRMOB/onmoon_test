import { Injectable } from '@nestjs/common';
import { InitialGameSettings } from './dtos';

@Injectable()
export class GameService {
	private gameField: (number | '*')[][];
	private readonly surroundingPointDiffs: number[][] = [
		[-1, 1],
		[0, 1],
		[1, 1],
		[-1, 0],
		[1, 0],
		[-1, -1],
		[0, -1],
		[1, -1],
	];
	private diamondsCoordinates: number[][];

	private fieldGenerate(data: InitialGameSettings): void {
		const { fieldSize, diamondsCount } = data;
		this.gameField = Array.from({ length: fieldSize }, () =>
			Array(fieldSize).fill(0),
		);
		this.diamondsCoordinates = this.getDiamondPoints(data);

		for (const [x, y] of this.diamondsCoordinates) {
			this.gameField[y][x] = '*';

			for (const [dX, dY] of this.surroundingPointDiffs) {
				const currX = x + dX;
				const currY = y + dY;

				if (
					currX >= fieldSize ||
					currY >= fieldSize ||
					currX < 0 ||
					currY < 0
				) {
					continue;
				}

				const currValue = this.gameField[currY][currX];

				if (typeof currValue !== 'number') {
					continue;
				}

				this.gameField[currY][currX] = currValue + 1;
			}
		}
	}

	private getDiamondPoints(data: InitialGameSettings) {
		const { fieldSize, diamondsCount } = data;
		const coordinates = new Set<string>();

		while (coordinates.size < diamondsCount) {
			const x = Math.floor(Math.random() * fieldSize);
			const y = Math.floor(Math.random() * fieldSize);
			coordinates.add(`${x},${y}`);
		}

		return [...coordinates].map((point) => point.split(',').map(Number));
	}

	public async startGame(data: InitialGameSettings): Promise<(number | '*')[][]> {
		try {
			this.fieldGenerate(data);
			console.log({ FIELD: this.gameField });

			return this.gameField;
		} catch (error) {
			console.error(error);
		}
	}
	public async newMove(): Promise<string> {
		try {
			console.log('MOVE MADE!!!!!');
			return 'MOVE MADE!!!!!';
		} catch (error) {
			console.log(error);
		}
	}
}
