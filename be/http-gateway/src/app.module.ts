import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { GameHttpController } from './diamond-game/diamond-game.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GAME_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'game-service',
          port: 8083,
        },
      },
    ]),
  ],
  controllers: [GameHttpController],
})
export class AppModule {}
