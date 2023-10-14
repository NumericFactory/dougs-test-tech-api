import { Module } from '@nestjs/common';
import { FakeDataFromBankSyncController } from './fake-data-from-bank-sync.controller';
import { FakeDataFromBankSyncService } from './fake-data-from-bank-sync.service';
import { FakeDataRepository } from './repository/fake-data.repository';

@Module({
  controllers: [FakeDataFromBankSyncController],
  providers: [FakeDataFromBankSyncService, FakeDataRepository],
})
export class FakeDataFromBankSyncModule { }
