import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BankBalance, Movement } from './models/data.model';

export interface ResponseReason {
    date: Date;
    isSyncValid: boolean;
    isduplicateEntriesFound: boolean;
    isMissingEntries: boolean;
}

@Injectable()
export class MovementService {

    constructor() { }

    /**
     * function that verify if the synchronization is valid
     * 
     * by comparing the computed sum of amount's movements, 
     * with the real balance from bank statement, for each period
     * @param movements 
     * @param bankStatements
     * @returns { message: 'Accepted' } | HttpException
     */
    isSyncValid(movements: Movement[], bankStatements: BankBalance[]): any {
        let isSyncValid: boolean = false, startBalance: number = 0, totalAmountPerPeriod: number = 0;
        let periods: ResponseReason[] = [];

        for (let i = bankStatements.length - 1; i >= 0; i--) {
            let partialMovements: Movement[] = this.getPartialMovements(movements, bankStatements, i);
            totalAmountPerPeriod = (Math.round(partialMovements.reduce((total, item) => total + item.amount, startBalance) * 100)) / 100;

            isSyncValid = totalAmountPerPeriod === bankStatements[i].balance ? true : false;
            let isDuplicateEntriesFound = this.isDuplicateEntriesFound(partialMovements);
            let isMissingEntries = !isSyncValid && !isDuplicateEntriesFound ? true : false;

            periods.push({
                date: bankStatements[i].date,
                isSyncValid: isSyncValid,
                isduplicateEntriesFound: isDuplicateEntriesFound,
                isMissingEntries: isMissingEntries
            });
            periods.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            // resync startBalance with bankStatements[i].balance, for next iteration
            startBalance = bankStatements[i].balance;
        }

        if (periods.some(period => period.isSyncValid === false)) {
            throw new HttpException({ message: 'i\'m a teapot', reasons: periods }, 418); // [418] Error
        }
        return { message: 'Accepted' }; // [202] { message: 'Accepted' }    
    }


    /**
     * function that returns partial movements, for each period 
     * in bankStatements range of dates
     * @param movements 
     * @param bankStatements
     * @param index 
     * @returns { Movement[] }
     */
    private getPartialMovements(movements: Movement[], bankStatements: BankBalance[], index: number): Movement[] {
        let partialMovements: Movement[] = [];
        if (index === bankStatements.length - 1) {
            partialMovements = movements.filter(movement =>
                new Date(movement.date).getTime() < new Date(bankStatements[index].date).getTime());
        } else {
            partialMovements = movements.filter(movement =>
                new Date(movement.date).getTime() < new Date(bankStatements[index].date).getTime()
                && new Date(movement.date).getTime() >= new Date(bankStatements[index + 1]?.date).getTime());
        }
        return partialMovements;

    }


    /**
     * function that return true if duplicate entries were found 
     * in Array<Movement> pass in parameters
     */
    private isDuplicateEntriesFound(movements: Movement[]): boolean {
        let isDuplicateEntriesFound = false;
        for (let i = 0; i < movements.length; i++) {
            let firstIndexFound = movements.findIndex(({ date, wording, amount }) => {
                return new Date(date).getTime() === new Date(movements[i].date).getTime() && wording === movements[i].wording && amount === movements[i].amount
            });
            if (firstIndexFound !== i) {
                isDuplicateEntriesFound = true;
                break;
            }
        }
        return isDuplicateEntriesFound;
    }



    /**
     * Function that remove duplicate entries 
     * from Movement[] pass in parameters
     *  
     * @param {Array<Movement>} movements
     * @returns { RemoveDuplicatedReturn }
     */
    private removeDuplicateEntries(movements: Movement[]): Movement[] {
        let uniqueMovements: Movement[] = [];
        // 1. remove duplicated entries
        for (let i = 0; i < movements.length; i++) {
            let firstIndexFound = movements.findIndex(({ date, wording, amount }) => {
                return new Date(date).getTime() === new Date(movements[i].date).getTime() && wording === movements[i].wording && amount === movements[i].amount
            });
            if (firstIndexFound === i) {
                uniqueMovements.push(movements[firstIndexFound])
            }
        }
        return uniqueMovements
    }



}
