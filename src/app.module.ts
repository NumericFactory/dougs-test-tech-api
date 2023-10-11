import { Module } from '@nestjs/common';
import { MovementModule } from './movement/movement.module';
import { AppController } from './app.controller';

@Module({
  imports: [MovementModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
