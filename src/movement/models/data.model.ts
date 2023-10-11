import { ApiProperty } from "@nestjs/swagger";
/**************************************
 * TYPE DATA - Movement and BankBalance
 **************************************
*/
// Type data: Movement
export class Movement {
    @ApiProperty()
    id: number;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    wording: string;
    @ApiProperty()
    amount: number;
}
// Type data: BankBalance
export class BankBalance {
    @ApiProperty()
    date: Date;
    @ApiProperty()
    balance: number
}