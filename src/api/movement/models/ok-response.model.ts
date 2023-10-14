import { ApiProperty } from "@nestjs/swagger";

/**
 * Type API OK Response
 **/
export class OkResponse {
    @ApiProperty({ example: 'Accepted' })
    message: string;
    constructor(message: string) {
        this.message = message;
    }
}