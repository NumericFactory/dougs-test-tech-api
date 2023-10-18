import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BankBalance, Movement } from './models/data.model';
import { Detail, Reason } from './models/response-with-reasons.model';

// interface RemoveDuplicatedReturn {
//     duplicateEntriesWereCleared: number;
//     uniqueMovements: Movement[];
//     balance: number;
//     isSyncValid: boolean;
// }

@Injectable()
export class MovementService {

    constructor() { }

    /**
     * function that vérify if the synchronization is OK
     * by comparing the computed sum of amount's movements, with the real balance from bank statement
     */
    isSyncValid(movements: Movement[], bankStatements: BankBalance[]): boolean {
        let startBalance = 0;
        for (let i = bankStatements.length - 1; i >= 0; i--) {
            let partialMovements = movements.filter(movement => new Date(movement.date).getTime() < new Date(bankStatements[i].date).getTime());
            let total = partialMovements.reduce((total, item) => total + item.amount, startBalance);
            console.log('total', total);
            console.log('bankStatements[i].balance', bankStatements[i].balance);
            total = bankStatements[i].balance;
            console.log('RESET TOTAL', total);
            // if (total !== bankStatements[i].balance) {
            //     return false;
            // }
            // else 

        }
        return true;
    }

    /**
     * Function that remove duplicated entries from Movement[] pass in parameters, 
     * and return the computed informations
     * @param {Array<Movement>} movements
     * @param {} realBalance 
     * @returns { RemoveDuplicatedReturn }
     */
    removeDuplicateEntries(movements: Movement[], realBalance: { date: Date, balance: number }): Detail {
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
        console.log('isSyncValid', isSyncValid);
        let detail: Detail = {
            removedDuplicatesEntries: movements.length - uniqueMovements.length,
            uniqueMovements: uniqueMovements,
            computedBalance: result,
            isSyncValid: isSyncValid

        };


        if (!isSyncValid) {
            throw new Error() // [418]
        }

        console.log('detail', detail);
        return detail;
    }




    handleErrors(error: Error, info: Detail) {

        let reason!: Reason;
        const { removedDuplicatesEntries, uniqueMovements, computedBalance, isSyncValid } = info;

        // CAS 2: synchronization is not OK - Reason: Duplicates entries were found and removed
        if (isSyncValid && removedDuplicatesEntries > 0) {
            reason = {
                message: "Duplicates entries were found and removed. Cleared uniqueMovements are in response.info",
                info: new Detail(removedDuplicatesEntries, uniqueMovements, computedBalance, isSyncValid)
            }
            throw new HttpException({ messages: 'I\'m a teapot', reasons: [reason] }, HttpStatus.I_AM_A_TEAPOT); // [418]
        }

        // CAS 3: synchronization is not OK - Reason: missing one or more entries
        if (!isSyncValid && removedDuplicatesEntries === 0) {
            reason = {
                message: `Missing one more entries. Please compare movements with the bank statement of the month`,
                info: new Detail(removedDuplicatesEntries, uniqueMovements, computedBalance, isSyncValid)
            }
            throw new HttpException({ messages: 'I\'m a teapot', reasons: [reason] }, HttpStatus.I_AM_A_TEAPOT); // [418]
        }

        // CAS 4: synchronization is not OK - Reason: Duplicated Entries were found and removed. But missing one or more entries
        if (!isSyncValid && removedDuplicatesEntries > 0) {
            reason = {
                message: `Duplicates entries were found and removed. Missing one more entries. Please compare unique movements with the bank statement of the month`,
                info: new Detail(removedDuplicatesEntries, uniqueMovements, computedBalance, isSyncValid)
            }
            throw new HttpException({ messages: 'I\'m a teapot', reasons: [reason] }, HttpStatus.I_AM_A_TEAPOT); // [418]
        }
    }




}
