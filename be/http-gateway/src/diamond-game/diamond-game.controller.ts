import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InitialGameSettings } from 'src/dtos';
import { GameSettingsValidationPipe } from 'src/pipes/size-validation.pipe';

@Controller('game')
export class GameHttpController {
	constructor(
		@Inject('GAME_SERVICE')
		private readonly gameService: ClientProxy,
	) {}

	@Post()
	@UsePipes(new GameSettingsValidationPipe())
	async startGame(
		@Body()
		initialSettings: InitialGameSettings,
	) {
		return this.gameService.send('startGame', initialSettings);
	}
}
