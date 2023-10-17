import { Controller, Get, Query } from '@nestjs/common';
import { FakeDataFromBankSyncService } from './fake-data-from-bank-sync.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Movement } from 'src/api/movement/models/data.model';

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
    getFakeData(@Query('withDuplicate') withDuplicate?: boolean) {
        const boolStr: any = withDuplicate;
        const withDuplicateItem: boolean = boolStr === 'true';

        let movementsFromSync: Movement[] = this.fakeDataFromBankSyncSvc.getFakeDataMovements();
        const bankStatements = this.fakeDataFromBankSyncSvc.getFakeDataBankStatements(movementsFromSync);

        movementsFromSync = withDuplicateItem
            ? this.fakeDataFromBankSyncSvc.getFakeDataMovementsWithDuplicated(movementsFromSync)
            : [...movementsFromSync];

        return {
            movements: movementsFromSync,
            bankStatements: bankStatements
        };
    }


}
