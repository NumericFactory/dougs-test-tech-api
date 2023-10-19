import { Test, TestingModule } from '@nestjs/testing';
import { MovementService } from '../movement.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('MovementService', () => {
  let service: MovementService;
  let mockData: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementService],

    }).compile();
    service = module.get<MovementService>(MovementService);
    // mock data
    mockData =
    {
      movements: [
        { id: 4, date: "2023-10-25T17:54:20.298Z", wording: "facture", amount: -214.11 },
        { id: 3, date: "2023-10-10T12:15:37.115Z", wording: "facture", amount: -214.43 },
        { id: 2, date: "2023-09-06T15:25:49.361Z", wording: "dépôt", amount: -279.52 },
        { id: 1, date: "2023-08-14T00:19:52.642Z", wording: "retrait", amount: -259.17 }
      ],
      bankStatements: [
        { id: 2, date: "2023-10-06T21:59:59.999Z", balance: -538.69 },
        { id: 1, date: "2023-09-06T21:59:59.999Z", balance: -538.69 }
      ]
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('isSyncValid() should return {message:"Accepted"}', () => {
    let response = service.isSyncValid(mockData.movements, mockData.bankStatements);
    expect(response).toBeDefined();
    expect(response).toHaveProperty('message'); // OkResponse
    expect(response.message).toBe('Accepted');
  })

  it('isSyncValid() should return {message:"I\'m a teapot"} if duplicate entries', () => {
    let movementsWithDuplicateEntries = [...mockData.movements, mockData.movements[3]];
    let hasThrown = false;
    try {
      let response = service.isSyncValid(movementsWithDuplicateEntries, mockData.bankStatements);
    } catch (error) {
      hasThrown = true;
      expect(error).toBeInstanceOf(HttpException);
      expect((error as HttpException).getStatus()).toBe(HttpStatus.I_AM_A_TEAPOT);
      expect((error as HttpException).getResponse()).toHaveProperty('message');
      expect((error as HttpException).getResponse()).toHaveProperty('reasons');
    }
    expect(hasThrown).toBe(true);
  })

  it('isSyncValid() should return {message:"I\'m a teapot"} if missing entries', () => {
    let movementsWithMissingEntries = mockData.movements.filter(movement => movement.id !== 1);
    let hasThrown = false;
    try {
      let response = service.isSyncValid(movementsWithMissingEntries, mockData.bankStatements);
    } catch (error) {
      hasThrown = true;
      expect(error).toBeInstanceOf(HttpException);
      expect((error as HttpException).getStatus()).toBe(HttpStatus.I_AM_A_TEAPOT);
      expect((error as HttpException).getResponse()).toHaveProperty('message');
      expect((error as HttpException).getResponse()).toHaveProperty('reasons');
    }
    expect(hasThrown).toBe(true);
  })

});
