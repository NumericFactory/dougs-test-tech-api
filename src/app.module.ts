import { Module } from '@nestjs/common';
import { MovementModule } from './api/movement/movement.module';
import { AppController } from './app.controller';
import { FakeDataFromBankSyncModule } from './fake-data-from-bank-sync/fake-data-from-bank-sync.module';

@Module({
  imports: [MovementModule, FakeDataFromBankSyncModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
