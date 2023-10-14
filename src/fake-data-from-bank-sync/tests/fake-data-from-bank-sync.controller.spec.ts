import { Test, TestingModule } from '@nestjs/testing';
import { FakeDataFromBankSyncController } from '../fake-data-from-bank-sync.controller';
import { FakeDataFromBankSyncService } from '../fake-data-from-bank-sync.service';
import { FakeDataRepository } from '../repository/fake-data.repository';

describe('FakeDataFromBankSyncController', () => {
  let controller: FakeDataFromBankSyncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FakeDataFromBankSyncController],
      providers: [FakeDataFromBankSyncService, FakeDataRepository],
    }).compile();

    controller = module.get<FakeDataFromBankSyncController>(FakeDataFromBankSyncController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
