import { Injectable } from '@nestjs/common';
import { Movement } from './models/data.model';
import { generateMovements, generateMovementsWithDuplicatesEntries } from './data/generate-fake-data';

interface RemoveDuplicatedReturn {
    duplicateEntriesWereCleared: number;
    uniqueMovements: Movement[];
    balance: number;
    isSyncValid: boolean;
}

@Injectable()
export class MovementService {

    /**
     * Function that remove duplicated entries from Movement[] pass in parameters, and return the computed informations
     * @param {Array<Movement>} movements
     * @param {} realBalance 
     * @returns { RemoveDuplicatedReturn }
     */
    removeDuplicatedEntries(movements: Movement[], realBalance: { date: Date, balance: number }): RemoveDuplicatedReturn {
        console.log("mbms", movements)
        let uniqueMovements: Movement[] = [];
        let result = 0;
        // 1. remove duplicated entries
        for (let i = 0; i < movements.length; i++) {
            let firstIndexFound = movements.findIndex(({ date, wording, amount }) => {
                return date === movements[i].date && wording === movements[i].wording && amount === movements[i].amount
            });
            if (firstIndexFound === i) {
                uniqueMovements.push(movements[firstIndexFound])
                result += Math.round(movements[i].amount * 100)
            }
        }
        // 2. compute informations
        result = result / 100
        let isSyncValid = result === realBalance.balance;
        console.log('compute', result);
        console.log('balance', realBalance.balance);
        return {
            duplicateEntriesWereCleared: movements.length - uniqueMovements.length,
            uniqueMovements: uniqueMovements,
            balance: result,
            isSyncValid: isSyncValid
        }
    }


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

}
