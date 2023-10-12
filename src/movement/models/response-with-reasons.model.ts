import { ValidateNested, IsArray, IsObject, } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Movement } from "../models/data.model";
/**
 * Type API ErrorResponseWithReasons
 **/
export class ErrorResponseWithReasons {
    @ApiProperty({ example: 'I\'m a teapot' })
    message: string;
    @ApiProperty({ example: [{ message: 'Duplicates entries were found and removed. Cleared uniqueMovements are in response.info', info: { removedDuplicatesEntries: 7, uniqueMovements: [{ id: 3, date: new Date('2023-10-06 15:30:00'), wording: 'Achat boulanger', amount: -119 }, { id: 4, date: new Date('2023-10-04 21:09:00'), wording: 'Facture client F021234', amount: 1230 }] } }] })
    reasons?: Reason[]
    constructor(message: string, reasons: Reason[]) {
        this.message = message;
        this.reasons = [...reasons]
    }
}

export class Reason {
    @IsObject()
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
