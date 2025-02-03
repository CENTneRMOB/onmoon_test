import { Module } from '@nestjs/common';
import { GameModule } from './diamonds-game/diamonds-game.module';
import { GameService } from './diamonds-game/diamonds-game.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		GameModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [],
	providers: [GameService],
})
export class AppModule {}
