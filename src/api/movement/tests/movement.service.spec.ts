import { Test, TestingModule } from '@nestjs/testing';
import { MovementService } from '../movement.service';

describe('MovementService', () => {
  let service: MovementService;
  let mockData: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementService],

    }).compile();
    service = module.get<MovementService>(MovementService);
    // mock data
    mockData = {
      movementsWithDuplicates: [
        { id: 1, date: new Date('2023-10-06'), wording: 'Facture client payée', amount: 1000 },
        { id: 2, date: new Date('2023-10-13'), wording: 'Facture EDF', amount: -600 },
        { id: 3, date: new Date('2023-10-06'), wording: 'Facture client payée', amount: 1000 },
        { id: 4, date: new Date('2023-10-13'), wording: 'Facture EDF', amount: -600 },
      ],
      realBalance: { date: new Date('2023-10-15'), balance: 400 }
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('removeDuplicateEntries().uniqueMovements should return an array without duplicate entries', () => {
    const movementsWithDuplicates = mockData.movementsWithDuplicates;
    const realBalance = mockData.realBalance;
    let results = service.removeDuplicateEntries(movementsWithDuplicates, realBalance);
    expect(results.uniqueMovements.length).toEqual(2);
    expect(results.duplicateEntriesWereCleared).toEqual(2);
  });

  it('removeDuplicateEntries().balance should return 400', () => {
    const movementsWithDuplicates = mockData.movementsWithDuplicates;
    const realBalance = mockData.realBalance;
    let results = service.removeDuplicateEntries(movementsWithDuplicates, realBalance);
    expect(results.balance).toEqual(400);
  });

  it('removeDuplicateEntries().isSyncValid should return true if computed balance after remove duplicate === realBalance', () => {
    const movementsWithDuplicates = mockData.movementsWithDuplicates;
    const realBalance = mockData.realBalance;
    let results = service.removeDuplicateEntries(movementsWithDuplicates, realBalance);
    expect(results.isSyncValid).toEqual(true);
  });

  it('removeDuplicateEntries().isSyncValid should return true if computed balance after remove duplicate != realBalance', () => {
    const movementsWithDuplicates = mockData.movementsWithDuplicates;
    const realBalance = mockData.realBalance;
    realBalance.balance = 500;
    let results = service.removeDuplicateEntries(movementsWithDuplicates, realBalance);
    expect(results.isSyncValid).toEqual(false);
  });



});
