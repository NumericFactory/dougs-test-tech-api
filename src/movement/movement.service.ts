import { Injectable } from '@nestjs/common';
import { Movement } from './models/data.model';
import { generateMovements, generateMovementsWithDuplicatesEntries } from './data/generate-fake-data';

@Injectable()
export class MovementService {

    /**
     * function that generate fake random movements for each 12 month
     * @returns  Movement[]
     */
    getFakeDataMovements(): Array<Movement[]> {
        return generateMovements()
    }

    /**
    * function that generate fake random movements for each 12 month with duplicates entries
    * @returns  Movement[]
    */
    getFakeDataMovementsWithDuplicated(): Array<Movement[]> {
        return generateMovementsWithDuplicatesEntries()
    }

    /**
     * 
     * @param {Array<Movement>} movements
     * @param {} realBalance 
     * @returns 
     */
    removeDuplicatedEntries(movements: any[], realBalance: { date: Date, balance: number }) {
        let uniqueMovements = [];
        let result = 0;
        for (let i = 0; i < movements.length; i++) {
            let firstIndexFound = movements.findIndex(({ date, wording, amount }) => {
                return date === movements[i].date && wording === movements[i].wording && amount === movements[i].amount
            });
            if (firstIndexFound === i) {
                uniqueMovements.push(movements[firstIndexFound])
                result += Math.round(movements[i].amount * 100)
            }
        }
        result = result / 100
        let isSyncValid = result === realBalance.balance;
        console.log('compute', result);
        console.log('balance', realBalance.balance);
        return {
            duplicateEntriesWereCleared: movements.length - uniqueMovements.length,
            uniqueMovements: uniqueMovements,
            balance: result,
            isSyncValid: isSyncValid,
            status: result === realBalance.balance ? 202 : 418,
            message: isSyncValid ? "Accepted" : "I'm a teapot",
            error: "missing one or more entries"
        }
    }



}
