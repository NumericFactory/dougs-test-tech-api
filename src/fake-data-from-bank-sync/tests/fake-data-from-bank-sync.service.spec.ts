import { Test, TestingModule } from '@nestjs/testing';
import { FakeDataFromBankSyncService } from '../fake-data-from-bank-sync.service';
import { FakeDataRepository } from '../repository/fake-data.repository';

describe('FakeDataFromBankSyncService', () => {
    let service: FakeDataFromBankSyncService;
    let mockData: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FakeDataFromBankSyncService, FakeDataRepository],

        }).compile();
        service = module.get<FakeDataFromBankSyncService>(FakeDataFromBankSyncService);
        // mock data
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('getFakeDataMovements() should generate Array Movement[]>', () => {
        let movements = service.getFakeDataMovements('2023-08-01');
        expect(movements).toBeInstanceOf(Array);
        expect(movements[0]).toHaveProperty('id');
        expect(movements[0]).toHaveProperty('date');
        expect(movements[0]).toHaveProperty('wording');
        expect(movements[0]).toHaveProperty('amount');
    });

    it('getFakeDataMovementsWithDuplicate() should generate Array of 12 <Movement[]>', () => {
        let movements = service.getFakeDataMovements('2023-08-01');
        expect(movements).toBeInstanceOf(Array);
    });

});
