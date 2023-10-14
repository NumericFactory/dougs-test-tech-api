import { ApiProperty } from "@nestjs/swagger";
/**************************************
 * TYPE DATA - Movement and BankBalance
 **************************************
*/
// Type data: Movement
export class Movement {
    @ApiProperty({ example: 1 })
    id: number;
    @ApiProperty({ example: new Date('2023-10-06 15:30:00') })
    date: Date;
    @ApiProperty({ example: 'Facture client F021234' })
    wording: string;
    @ApiProperty({ example: 1230 })
    amount: number;

    constructor(id: number, date: Date, wording: string, amount: number) {
        this.id = id;
        this.date = date;
        this.wording = wording;
        this.amount = amount;
    }
}
// Type data: BankBalance
export class BankBalance {
    @ApiProperty({ example: new Date('2023-10-31') })
    date: Date;
    @ApiProperty({ example: 1748.6 })
    balance: number
}