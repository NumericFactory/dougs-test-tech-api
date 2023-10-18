import { Req } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsString, isBooleanString } from "class-validator";
import { type } from "os";

export class GetDataQueryParams {
    @ApiProperty({ example: false, required: false })
    withDuplicate?: boolean;

    @ApiProperty({ example: false, required: false })
    withMissing?: boolean;

    @ApiProperty({ example: '2023-01-01', required: false })
    startAt?: string;

    @ApiProperty({ example: 3, required: false })
    minPerMonth?: string;

    @ApiProperty({ example: 8, required: false })
    maxPerMonth?: string;
}
