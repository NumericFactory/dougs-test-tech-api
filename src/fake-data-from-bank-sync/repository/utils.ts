import { faker } from "@faker-js/faker";
import moment from "moment";

/**
 * UTILS FUNCTIONS : Returns a random number between min and max
 * - randomIntBtw(min, max) : number
 * - generateRandomDates(startDate) : Date[]
*/
export function randomIntBtw(min: number, max: number): number {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

// Function that generate a random array of many dates/month, between a start date and now
export function generateRandomDatesArray(startDate?: string, minNumOfDatesPerMonth?: number, maxNumOfDatesPerMonth?: number): Date[] {
    const start = startDate ? moment(new Date(startDate)) : moment(new Date('2023-01-01'));
    const end = moment()
    const randomDates = [];

    while (start.isSameOrBefore(end)) {
        const numOfDatesPerMonth = randomIntBtw(
            minNumOfDatesPerMonth ? minNumOfDatesPerMonth : 3,
            maxNumOfDatesPerMonth ? maxNumOfDatesPerMonth : 8);
        for (let i = 1; i <= numOfDatesPerMonth; i++) {
            console.log('start.toDate() exec', start.toDate())
            const randomDate = faker.date.between({ from: Number(start.toDate().setDate(1)), to: Number(start.toDate().setDate(28)) });
            randomDates.push(randomDate);
        }
        start.add(1, 'month');
    }
    // sort dates in descending order
    console.log('RandomDates', randomDates)
    if (randomDates.length > 1) {
        randomDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    }
    return randomDates;
}

// Function that duplicate a random entry in Array
export function duplicateRandomEntry(data: any[], count: number): any[] {
    const duplicates = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = randomIntBtw(0, data.length - 1);
        const randomEntry = data[randomIndex];
        duplicates.push({ ...randomEntry, id: data.length + i + 1 });
    }
    return duplicates;
}

// Function that group items by month
export function groupItemPerMonth(array: any[], property: string): any[] {
    const groupByMonthArray = array.reduce((result, item) => {
        const date = new Date(item[property]);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Month is 0-based, so we add 1
        const key = `${year}-${month}`;
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
        return result;
    }, {});
    return groupByMonthArray
}

// Function that create an array of dates between two dates with a specific day of the month
export function getArrayOfDates(startDate: Date, endDate: Date, day: number): Date[] {
    const result = [];
    let currentDate = new Date(startDate);

    if (currentDate.getDate() > day) {
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    currentDate.setDate(day);
    currentDate.setHours(23, 59, 59, 999);

    while (currentDate <= endDate) {
        result.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    // sort dates in descending order
    return result.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());;
}

/**
 * END UTILS FUNCTIONS
*/