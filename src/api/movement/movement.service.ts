import { Injectable } from '@nestjs/common';
import { Movement } from './models/data.model';

interface RemoveDuplicatedReturn {
    duplicateEntriesWereCleared: number;
    uniqueMovements: Movement[];
    balance: number;
    isSyncValid: boolean;
}

@Injectable()
export class MovementService {

    constructor() { }

    /**
     * Function that remove duplicated entries from Movement[] pass in parameters, 
     * and return the computed informations
     * @param {Array<Movement>} movements
     * @param {} realBalance 
     * @returns { RemoveDuplicatedReturn }
     */
    removeDuplicateEntries(movements: Movement[], realBalance: { date: Date, balance: number }): RemoveDuplicatedReturn {
        let uniqueMovements: Movement[] = [];
        let result = 0;
        // 1. remove duplicated entries
        for (let i = 0; i < movements.length; i++) {
            let firstIndexFound = movements.findIndex(({ date, wording, amount }) => {
                return new Date(date).getTime() === new Date(movements[i].date).getTime() && wording === movements[i].wording && amount === movements[i].amount
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



}
