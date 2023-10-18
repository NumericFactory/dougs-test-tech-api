import { fakerFR as faker } from '@faker-js/faker';
import moment from 'moment';
import { BankBalance, Movement } from '../../api/movement/models/data.model';
import * as utils from './utils';
import { start } from 'repl';


/**********************************************************
 * FUNCTIONS TO GENERATE FAKE DATA
 * fake data simulates sync movements from scrapped source
 **********************************************************
*/
/**
 * Create a new random movement item
 * @param {number} id 
 * @param {Date} date 
 * @returns {Movement} new movement created
 */
export function createMovementItem(id: number, date: Date): Movement {
    const isPositive = faker.datatype.boolean(0.2)
    let randomAmountPositive = parseFloat(faker.finance.amount(990, 5500));
    let randomAmountNegative = 0 - parseFloat(faker.finance.amount(150, 350));
    let randomAmount = isPositive ? randomAmountPositive : randomAmountNegative;
    let randomWording = isPositive ? "Facture client payée" : faker.finance.transactionType()
    return new Movement(id, date, randomWording, randomAmount);
}


/**
 * Function that generate fake random movements for each 12 month
 * rules (in above createMovementItem function): 
 * - 3-8 movements per month (random)
 * - 20% of movements are positive (random)
 * - amount between 150-350 if amount is negative
 * - amount between 990-5500 if amount is positive
 * @returns {Array<Movement>} 
 */
export function generateMovements(startDateStr: string, minNumOfDatesPerMonth?: number, maxNumOfDatesPerMonth?: number): Movement[] {
    const randomDates = utils.generateRandomDatesArray(startDateStr, minNumOfDatesPerMonth, maxNumOfDatesPerMonth);
    const length = randomDates.length;
    // Create movement items for each date
    const randomMovements = randomDates.map((date, index) => {
        let autoIncrementId = length - index;
        return createMovementItem(autoIncrementId, moment(date).toDate())
    });
    return randomMovements;
}


/**
 * Function that generate fake random movements with 10 duplicate entries
 * @returns {Array<Movement>} 
 */
export function generateMovementsWithDuplicatesEntries(movements: Movement[]): Movement[] {
    const duplicateMovements = utils.duplicateRandomEntry(movements, 3);
    movements = [...duplicateMovements, ...movements,];
    movements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return movements;
}

/**
 * Function that generate fake random movements with 3 missing entries
 * @returns {Array<Movement>} 
 */
export function generateMovementsWithMissingEntries(movements: Movement[], numberEntriesToDelete: number): Movement[] {
    for (let i = 0; i < numberEntriesToDelete; i++) {
        let randomIndexToDelete = utils.randomIntBtw(0, movements.length - 1);
        movements.splice(randomIndexToDelete, 1);
    }
    return movements;
}

/**
 * Function that generate bank balance statement, each month at the choosen day, 
 * from movements Array
 * @param {Movement[]} movements
 * @param {number} dayOfTheMonth
 * @param {number} startingBalance
 * @returns {BankBalance[]} 
 */
export function generateBankStatements(movements: Movement[], dayOfTheMonth?: number, startingBalance?: number): BankBalance[] {
    let bankStatements = [];
    let dayOfBankStatement = dayOfTheMonth ? dayOfTheMonth : 6;
    let startDate = new Date(movements[movements.length - 1].date);
    let endDate = new Date(movements[0].date);

    let arrayOfDatesBankStatement = utils.getArrayOfDates(startDate, endDate, dayOfBankStatement);

    let startBalance = startingBalance ? startingBalance : 0;
    for (let i = 0; i < arrayOfDatesBankStatement.length; i++) {
        let partialMovements = movements.filter(movement => new Date(movement.date).getTime() < new Date(arrayOfDatesBankStatement[i]).getTime());
        let total = partialMovements.reduce((total, item) => total + item.amount, startBalance);
        bankStatements.push(new BankBalance(
            arrayOfDatesBankStatement.length - i,
            arrayOfDatesBankStatement[i],
            Math.round(total * 100) / 100));
    }

    return bankStatements;
}
