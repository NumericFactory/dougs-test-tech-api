import { fakerFR as faker } from '@faker-js/faker';
import moment from 'moment';
import { Movement } from '../../api/movement/models/data.model';

/**********************************************************
 * FUNCTIONS TO GENERATE FAKE DATA
 * fake data simulates sync movements from scrapped source
 **********************************************************
*/
/**
 * Create a new random movement item
 * @param {number} id: 
 * @param {number} month 
 * @returns {Movement} new movement created
 */
export function createMovementItem(id: number, date: Date): Movement {
    const isPositive = faker.datatype.boolean(0.2)
    let randomAmountPositive = parseFloat(faker.finance.amount(990, 5500));
    let randomAmountNegative = 0 - parseFloat(faker.finance.amount(150, 350));
    let randomAmount = isPositive ? randomAmountPositive : randomAmountNegative;
    let randomWording = isPositive ? "Facture client payée" : faker.finance.transactionType()
    return { id: id, date: date, wording: randomWording, amount: randomAmount }
}


/**
 * Function that generate fake random movements for each 12 month
 * rules: 
 * - 3-8 movements per month (random)
 * - 20% of movements are positive (random)
 * - amount between 150-350 if amount is negative
 * - amount between 990-5500 if amount is positive
 * @returns {Array<Movement>} 
 */
export function generateMovements(): Movement[] {
    const randomDates = generateRandomDates();
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
export function generateMovementsWithDuplicatesEntries(): Movement[] {
    let randomMovements = generateMovements();
    const duplicateMovements = duplicateRandomEntry(randomMovements, 10);
    randomMovements = [...duplicateMovements, ...randomMovements,];
    randomMovements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return randomMovements;

}


/**
 * UTILS FUNCTIONS : Returns a random number between min and max
 * - randomIntBtw(min, max) : number
 * - generateRandomDates(startDate) : Date[]
*/
function randomIntBtw(min: number, max: number) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

function generateRandomDates(startDate?: Date) {
    const start = startDate ? moment(startDate) : moment(new Date('2023-01-01'));
    const end = moment()
    const randomDates = [];
    while (start.isSameOrBefore(end)) {
        const numOfDatesPerMonth = randomIntBtw(3, 8);
        for (let i = 0; i < numOfDatesPerMonth; i++) {
            const randomDate = faker.date.between({ from: Number(start.toDate().setDate(1)), to: Number(start.toDate().setDate(28)) });
            randomDates.push(randomDate);
        }
        start.add(1, 'month');
    }
    // sort dates in descending order
    randomDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    return randomDates;
}

// Function to duplicate a random entry in Array
function duplicateRandomEntry(data: any[], count: number) {
    const duplicates = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = randomIntBtw(0, data.length - 1);
        const randomEntry = data[randomIndex];
        duplicates.push({ ...randomEntry, id: data.length + i + 1 });
    }
    return duplicates;
}
/**
 * END UTILS FUNCTIONS
*/
