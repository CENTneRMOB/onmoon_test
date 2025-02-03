import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SocketGateway } from './diamond-game/diamond-game.gateway';

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
	providers: [SocketGateway],
})
export class AppModule {}
