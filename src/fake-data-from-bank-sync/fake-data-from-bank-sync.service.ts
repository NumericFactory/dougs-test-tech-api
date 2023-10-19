import { Injectable } from '@nestjs/common';
import { BankBalance, Movement } from '../api/movement/models/data.model';
import { FakeDataRepository } from './repository/fake-data.repository';

@Injectable()
export class FakeDataFromBankSyncService {

    constructor(private readonly fakeDataRepository: FakeDataRepository) { }

    /**
     * function that return fake random movements without duplicates entries
     * @returns  Movement[]
     */
    getFakeDataMovements(startDateStr: string, minNumOfDatesPerMonth?: number, maxNumOfDatesPerMonth?: number): Movement[] {
        return this.fakeDataRepository.getMovementsFromBankServiceSync(
            startDateStr,
            minNumOfDatesPerMonth,
            maxNumOfDatesPerMonth)
    }

    /**
    * function that return fake random movements with duplicates entries
    * @returns  Movement[]
    */
    getFakeDataMovementsWithDuplicated(movements: Movement[]): Movement[] {
        return this.fakeDataRepository.getMovementsWithDuplicateFromBankServiceSync(movements)
    }

    /**
    * function that return fake random movements with duplicates entries
    * @returns  Movement[]
    */
    getFakeDataMovementsWithMissing(movements: Movement[], numberEntriesToDelete: number): Movement[] {
        return this.fakeDataRepository.getMovementsWithMissingFromBankServiceSync(movements, numberEntriesToDelete)
    }


    /**
     * function that return computed bank statements balance from movements
     * @param movements 
     * @returns 
     */
    getFakeDataBankStatements(movements: Movement[]): BankBalance[] {
        return this.fakeDataRepository.generateBankStatementsFromMovements(movements, 6, 0);
    }

}
