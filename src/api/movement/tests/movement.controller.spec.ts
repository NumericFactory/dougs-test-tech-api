import { Test, TestingModule } from '@nestjs/testing';
import { MovementController } from '../movement.controller';
import { MovementService } from '../movement.service';
import { FakeDataFromBankSyncService } from '../../../fake-data-from-bank-sync/fake-data-from-bank-sync.service';
import { FakeDataRepository } from '../../../fake-data-from-bank-sync/repository/fake-data.repository';

describe('MovementController', () => {
  let controller: MovementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementController],
      providers: [MovementService],
    }).compile();

    controller = module.get<MovementController>(MovementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});


