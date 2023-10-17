// import { ValidateNested, IsArray, IsObject, } from "class-validator";
// import { Movement } from "../models/data.model";
// import { Type } from "class-transformer";
// import { ApiProperty } from "@nestjs/swagger";

import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Movement } from "../models/data.model";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

// import { generateMovementsWithDuplicatesEntries } from "../data/generate-fake-data";

export class MovementsDto {
    //@ApiProperty({ type: Array<Movement>, isArray: true })
    @Type(() => Movement)
    movements: Movement[];
}
