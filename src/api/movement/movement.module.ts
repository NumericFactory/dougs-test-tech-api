import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { FakeDataFromBankSyncService } from '../../fake-data-from-bank-sync/fake-data-from-bank-sync.service';
import { FakeDataRepository } from '../../fake-data-from-bank-sync/repository/fake-data.repository';

@Module({
  controllers: [MovementController],
  providers: [MovementService, FakeDataFromBankSyncService, FakeDataRepository]
})
export class MovementModule { }
