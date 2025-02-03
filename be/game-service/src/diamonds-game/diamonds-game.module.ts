import { Module } from '@nestjs/common';
import { GameController } from './diamonds-game.controller';
import { GameService } from './diamonds-game.service';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
