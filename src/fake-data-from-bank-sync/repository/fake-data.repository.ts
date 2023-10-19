import { Injectable } from '@nestjs/common';
import { BankBalance, Movement } from '../../api/movement/models/data.model';
import * as fakeData from './fake-data';
import { start } from 'repl';


@Injectable()
export class FakeDataRepository {

    getMovementsFromBankServiceSync(startDateStr: string, minNumOfDatesPerMonth?: number, maxNumOfDatesPerMonth?: number): Movement[] {
        return fakeData.generateMovements(startDateStr, minNumOfDatesPerMonth, maxNumOfDatesPerMonth);
    }

    getMovementsWithDuplicateFromBankServiceSync(movements: Movement[]): Movement[] {
        return fakeData.generateMovementsWithDuplicatesEntries(movements)
    }

    getMovementsWithMissingFromBankServiceSync(movements: Movement[], numberEntriesToDelete: number): Movement[] {
        return fakeData.generateMovementsWithMissingEntries(movements, numberEntriesToDelete)
    }

    generateBankStatementsFromMovements(movements: Movement[], startDay: number, startBalance: number): BankBalance[] {
        return fakeData.generateBankStatements(movements, startDay, startBalance);
    }

}