import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@WebSocketGateway({
	cors: { origin: '*' },
	namespace: '/game',
})
export class SocketGateway {
	@WebSocketServer() server: Server;

	constructor(
		@Inject('GAME_SERVICE')
		private readonly gameService: ClientProxy,
	) {}

	handleConnection(client: any) {
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: any) {
		console.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('newMove')
	async handleMakeMove(@MessageBody() data: any) {
		console.log('Received make_move request:', data);

		return this.gameService.send('newMove', data);
	}
}
