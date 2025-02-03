import { Controller } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { GameService } from './diamonds-game.service';
import { InitialGameSettings } from "./dtos";

@Controller()
export class GameController {
  constructor(private gameService: GameService) {}

  @MessagePattern('startGame')
  async startGame(
    @Payload()
    data: InitialGameSettings,
  ) {
    return this.gameService.startGame(data);
  }

  @MessagePattern('newMove')
  async newMove() {
    return this.gameService.newMove();
  }
}
