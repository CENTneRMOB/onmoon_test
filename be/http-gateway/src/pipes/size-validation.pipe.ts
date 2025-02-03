import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { InitialGameSettings } from 'src/dtos';

@Injectable()
export class GameSettingsValidationPipe implements PipeTransform {
	private isDiamondsCountValidBySize(data: InitialGameSettings): boolean {
		const { fieldSize, diamondsCount } = data;

		const maxDiamondsCount = fieldSize * fieldSize;

		return diamondsCount <= maxDiamondsCount;
	}

	private isOdd(count: number): boolean {
		return count % 2 !== 0;
	}
	transform(data: InitialGameSettings): object {
		if (data.fieldSize < 1 || data.fieldSize > 6) {
			throw new BadRequestException('Size must be between 1 and 6');
		}

		if (!this.isDiamondsCountValidBySize(data)) {
			throw new BadRequestException(
				'The number of diamonds cannot be more than the number of cells',
			);
		}

		if (!this.isOdd(data.diamondsCount)) {
			throw new BadRequestException('The number of diamonds must be odd');
		}

		return data;
	}
}
