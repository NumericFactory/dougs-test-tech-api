import { Injectable } from '@nestjs/common';
import { Movement } from '../api/movement/models/data.model';
import { FakeDataRepository } from './repository/fake-data.repository';

interface RemoveDuplicatedReturn {
    duplicateEntriesWereCleared: number;
    uniqueMovements: Movement[];
    balance: number;
    isSyncValid: boolean;
}

@Injectable()
export class FakeDataFromBankSyncService {

    constructor(private readonly fakeDataRepository: FakeDataRepository) { }

    /**
     * function that return fake random movements without duplicates entries
     * @returns  Movement[]
     */
    getFakeDataMovements(): Movement[] {
        console.log('without dup')
        return this.fakeDataRepository.getMovementsFromBankServiceSync()
    }


    /**
    * function that return fake random movements with duplicates entries
    * @returns  Movement[]
    */
    getFakeDataMovementsWithDuplicated(): Movement[] {
        return this.fakeDataRepository.getMovementsWithDuplicateFromBankServiceSync()
    }


}
