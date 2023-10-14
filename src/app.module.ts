import { Module } from '@nestjs/common';
import { MovementModule } from './api/movement/movement.module';
import { AppController } from './app.controller';
import { FakeDataFromBankSyncModule } from './fake-data-from-bank-sync/fake-data-from-bank-sync.module';
import { FakeDataFromBankSyncController } from './fake-data-from-bank-sync/fake-data-from-bank-sync.controller';
import { FakeDataFromBankSyncService } from './fake-data-from-bank-sync/fake-data-from-bank-sync.service';
import { FakeDataRepository } from './fake-data-from-bank-sync/repository/fake-data.repository';

@Module({
  imports: [MovementModule, FakeDataFromBankSyncModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
