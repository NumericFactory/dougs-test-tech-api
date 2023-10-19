import { Controller, Get, Query } from '@nestjs/common';
import { FakeDataFromBankSyncService } from './fake-data-from-bank-sync.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BankBalance, Movement } from 'src/api/movement/models/data.model';
import { GetDataQueryParams } from './models/get-data-query';
import { movementAndBankStatementDto } from 'src/api/movement/dto/dto';

@Controller('getdata-from-bank-sync')
export class FakeDataFromBankSyncController {

    constructor(private readonly fakeDataFromBankSyncSvc: FakeDataFromBankSyncService) { }

    /**
    * Function that generate fake random movements data and bank statements
    * @queryParam withDuplicate - if true, push duplicate entries in movements[]  
    * @queryParam withMissing - if true, delete one or more entries in movements[]   
    * @queryParam startAt - start date of movements 
    * @queryParam minPerMonth - minimum number of movements per month   
    * @queryParam maxPerMonth - maximum number of movements per month   
    * @returns movementAndBankStatementDto - { movements: Movement[], bankStatements: BankBalance[] }
   */
    @ApiTags('Generate fake movements data and computed bank statements data')
    @ApiResponse({ status: 200, description: 'Object with 2 properties : movements, bankStatements' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 500, description: 'Server error' })

    @Get()
    getFakeData(
        @Query() queryParams: GetDataQueryParams
    ): movementAndBankStatementDto {
        const boolStrDup: any = queryParams.withDuplicate;
        const boolStrMissing: any = queryParams.withMissing;
        const withDuplicateItem: boolean = boolStrDup === 'true';
        const withMissingItem: boolean = boolStrMissing === 'true';
        const minPerMonth: number = queryParams.minPerMonth ? parseInt(queryParams.minPerMonth) : 3;
        const maxPerMonth: number = queryParams.maxPerMonth ? parseInt(queryParams.maxPerMonth) : 8;

        let movementsFromSync: Movement[] = this.fakeDataFromBankSyncSvc.getFakeDataMovements(
            queryParams.startAt ? queryParams.startAt : '2023-01-01',
            minPerMonth,
            maxPerMonth);
        const bankStatements = this.fakeDataFromBankSyncSvc.getFakeDataBankStatements(movementsFromSync);

        movementsFromSync = withMissingItem
            ? this.fakeDataFromBankSyncSvc.getFakeDataMovementsWithMissing(movementsFromSync, 5)
            : [...movementsFromSync];

        movementsFromSync = withDuplicateItem
            ? this.fakeDataFromBankSyncSvc.getFakeDataMovementsWithDuplicated(movementsFromSync)
            : [...movementsFromSync];

        return {
            movements: movementsFromSync,
            bankStatements: bankStatements
        };
    }


}
