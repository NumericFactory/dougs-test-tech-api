import { Injectable } from '@nestjs/common';
import { BankBalance, Movement } from '../../api/movement/models/data.model';
import * as fakeData from './fake-data';


@Injectable()
export class FakeDataRepository {

    getMovementsFromBankServiceSync(): Movement[] {
        return fakeData.generateMovements();

    }

    getMovementsWithDuplicateFromBankServiceSync(movements: Movement[]): Movement[] {
        return fakeData.generateMovementsWithDuplicatesEntries(movements)
    }

    generateBankStatementsFromMovements(movements: Movement[], startDay: number, startBalance: number): BankBalance[] {
        return fakeData.generateBankStatements(movements, startDay, startBalance);
    }

}