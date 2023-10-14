// import { ValidateNested, IsArray, IsObject, } from "class-validator";
// import { Movement } from "../models/data.model";
// import { Type } from "class-transformer";
// import { ApiProperty } from "@nestjs/swagger";

import { IsArray, ValidateNested } from "class-validator";
import { Movement } from "../models/data.model";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

// import { generateMovementsWithDuplicatesEntries } from "../data/generate-fake-data";

export class MovementsByMonthDto {

    @ApiProperty({ type: Array<Movement[]> })
    @Type(() => Movement)
    items: Array<Movement[]>;
}
