// import { ValidateNested, IsArray, IsObject, } from "class-validator";
// import { Movement } from "../models/data.model";
// import { Type } from "class-transformer";
// import { ApiProperty } from "@nestjs/swagger";

// import { generateMovementsWithDuplicatesEntries } from "../data/generate-fake-data";

// export class NestedObjectDto {
//     @IsObject()
//     @ApiProperty()
//     objectProperty: Movement;
// }

// export class MonthArrayDto {
//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => NestedObjectDto)
//     arrayProperty: NestedObjectDto[];
// }

// export class MovementsByMonthDto {

//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => NestedArrayDto)
//     //@ApiProperty({ isArray: true, type: [MonthArrayDto] })
//     @ApiProperty({ isArray: true, type: [Array<MonthArrayDto>], example: generateMovementsWithDuplicatesEntries() })
//     arrayProperty: Array<MonthArrayDto>;
// }







// export class NestedArrayDto {
//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => NestedObjectDto)
//     arrayProperty: NestedObjectDto[];
// }