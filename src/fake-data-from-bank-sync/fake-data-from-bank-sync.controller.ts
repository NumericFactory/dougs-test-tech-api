import { Controller, Get, Query } from '@nestjs/common';
import { FakeDataFromBankSyncService } from './fake-data-from-bank-sync.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Movement } from 'src/api/movement/models/data.model';
import { GetDataQueryParams } from './models/get-data-query';

@Controller('getdata-from-bank-sync')
export class FakeDataFromBankSyncController {

    constructor(private readonly fakeDataFromBankSyncSvc: FakeDataFromBankSyncService) { }

    /**
    * Function that generate fake random movements for each 12 month
    * @param { boolean } withDuplicate  - if we want duplicated entries for each month
    * @returns {Array<Movement[]>} movements - simulated movements from scrapped source
   */
    @ApiTags('Generate fake movements data (for each 12 month)')
    @ApiResponse({ status: 200, description: 'Array of 12 months. Each Month contains a Movement Array' })
    @ApiResponse({ status: 500, description: 'Server error' })

    @Get()
    getFakeData(
        @Query() queryParams: GetDataQueryParams
    ) {
        const boolStrDup: any = queryParams.withDuplicate;
        const boolStrMissing: any = queryParams.withMissing;
        const withDuplicateItem: boolean = boolStrDup === 'true';
        const withMissingItem: boolean = boolStrMissing === 'true';
        const minPerMonth: number = queryParams.minPerMonth ? parseInt(queryParams.minPerMonth) : 3;
        const maxPerMonth: number = queryParams.maxPerMonth ? parseInt(queryParams.maxPerMonth) : 8;
        console.log(minPerMonth)
        console.log(maxPerMonth)

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
