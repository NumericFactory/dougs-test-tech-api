import { ValidateNested, IsArray, IsObject, } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Type API ErrorResponseWithReasons
 **/
export class ErrorResponseWithReasons {
    @ApiProperty({ example: 'I\'m a teapot' })
    message: string;

    @ApiProperty({
        example: {

            "message": "i'm a teapot",
            "reasons": [
                {
                    "date": "2023-10-06T21:59:59.999Z",
                    "isSyncValid": true,
                    "isduplicateEntriesFound": false,
                    "isMissingEntries": false
                },
                {
                    "date": "2023-09-06T21:59:59.999Z",
                    "isSyncValid": true,
                    "isduplicateEntriesFound": false,
                    "isMissingEntries": false
                },
                {
                    "date": "2023-08-06T21:59:59.999Z",
                    "isSyncValid": true,
                    "isduplicateEntriesFound": false,
                    "isMissingEntries": false
                }
            ]
        }
    })
    reasons?: Reason[]
}

export interface Reason {
    date: Date;
    isSyncValid: boolean;
    isduplicateEntriesFound: boolean;
    isMissingEntries: boolean;
}



