import { fakerFR as faker } from '@faker-js/faker';
import { Movement } from '../../api/movement/models/data.model';

/**********************************************************
 * FUNCTIONS TO GENERATE FAKE DATA
 * fake data simulates sync movements from scrapped source
 **********************************************************
*/
/**
 * Create a new random movement item for fake data
 * @param {number} id: 
 * @param {number} month 
 * @returns {Movement} new movement created for test
 */
export function createMovementItem(id: number, month: number): Movement {
    const randomYear = 2023;
    const randomMonth = month;
    const randomDay = intbtw(1, 28);
    const randomDate = new Date(randomYear, randomMonth, randomDay);
    const isPositive = faker.datatype.boolean(0.2)
    let randomAmountPositive = parseFloat(faker.finance.amount(990, 5500));
    let randomAmountNegative = 0 - parseFloat(faker.finance.amount(150, 350));
    let randomAmount = isPositive ? randomAmountPositive : randomAmountNegative;
    let randomWording = isPositive ? "Facture client payée" : faker.finance.transactionType()
    return { id: id, date: randomDate, wording: randomWording, amount: randomAmount }
}

/**
 * Function that generate fake random movements for each 12 month
 * @returns {Array<Movement[]>} - 12 arrays of movements (1 Movement[] per month)
 */
export function generateMovements(): Array<Movement[]> {
    const generatedMovements = []
    let idAIncrement = 0;
    for (let month = 0; month < 12; month++) {
        generatedMovements[month] = [];
        const numberOfMovements = intbtw(3, 8);
        for (let j = 0; j < numberOfMovements; j++) {
            idAIncrement++;
            let movementItem = createMovementItem(idAIncrement, month)
            generatedMovements[month].push(movementItem)
        }
    }
    return generatedMovements;
}


/**
* function that generate fake random movements for each 12 month with duplicates entries
* @returns {Array<Movement[]>} - 12 arrays of movements (1 Movement[] per month)
*/
export function generateMovementsWithDuplicatesEntries(): Array<Movement[]> {
    const generatedMovements = []
    let idAIncrement = 0;
    for (let month = 0; month < 12; month++) {
        generatedMovements[month] = [];
        const numberOfMovements = intbtw(3, 8);

        for (let j = 0; j < numberOfMovements; j++) {
            idAIncrement++;
            const randomYear = 2023;
            const randomMonth = month;
            const randomDay = intbtw(1, 28);
            const randomDate = new Date(randomYear, randomMonth, randomDay);
            const isPositive = faker.datatype.boolean(0.2)
            let randomAmountPositive = parseFloat(faker.finance.amount(990, 5500));
            let randomAmountNegative = 0 - parseFloat(faker.finance.amount(150, 350));
            let randomAmount = isPositive ? randomAmountPositive : randomAmountNegative;
            let randomWording = isPositive ? "Facture client payée" : faker.finance.transactionType()
            let movement = { id: idAIncrement, date: randomDate, wording: randomWording, amount: randomAmount }
            generatedMovements[month].push(movement)
        }
        // add duplicates entries
        generatedMovements[month] = [generatedMovements[month][0], generatedMovements[month][1], generatedMovements[month][2], ...generatedMovements[month]]
    }
    // add duplicates entries

    return generatedMovements;
}



// UTILS : Returns a random number between min and max
function intbtw(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}
