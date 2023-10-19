import { ApiProperty } from "@nestjs/swagger";
import { BankBalance, Movement } from "../models/data.model";


export class movementAndBankStatementDto {
    @ApiProperty({
        example: [
            { id: 5, date: "2023-10-08T06:42:27.520Z", wording: "Facture client payée", amount: 1597.27 },
            { id: 4, date: "2023-10-06T12:43:20.148Z", wording: "retrait", amount: -152.87 },
            { id: 3, date: "2023-09-13T18:31:10.010Z", wording: "Facture client payée", amount: 2084.7 },
            { id: 2, date: "2023-08-26T21:58:59.987Z", wording: "facture", amount: -249.12 },
            { id: 1, date: "2023-08-13T06:19:16.663Z", wording: "Facture client payée", amount: 3392.07 }
        ]
    })
    movements: Movement[];
    @ApiProperty({
        example: [
            { id: 2, date: "2023-10-06T21:59:59.999Z", balance: 5074.78 },
            { id: 1, date: "2023-09-06T21:59:59.999Z", balance: 3142.95 }
        ]
    })
    bankStatements: BankBalance[];
}
