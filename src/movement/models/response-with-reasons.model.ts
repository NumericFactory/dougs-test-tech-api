import { Movement } from "../models/data.model";

/**
 * Type API Response
 **/

// SUCCESS TYPE
export class OkResponse {
    message: string;
    constructor(message) {
        this.message = message;
    }
}

// ERROR TYPE
export class ErrorResponseWithReasons {
    message: string;
    reasons?: Reason[]
    constructor(message: string, reasons: Reason[]) {
        this.message = message;
        this.reasons = [...reasons]
    }
}

export class Reason {
    message: string;
    info: Detail
}

export class Detail {
    removedDuplicatesEntries: number;
    uniqueMovements: Movement[];
    computedBalance: number;

    constructor(removedDuplicatesEntries: number, uniqueMovements: Movement[], computedBalance: number) {
        this.removedDuplicatesEntries = removedDuplicatesEntries;
        this.uniqueMovements = [...uniqueMovements];
        this.computedBalance = computedBalance;
    }
}