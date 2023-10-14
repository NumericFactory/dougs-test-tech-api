import { Controller, Get, Query } from '@nestjs/common';
import { FakeDataFromBankSyncService } from './fake-data-from-bank-sync.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Movement } from 'src/api/movement/models/data.model';

@Controller('getdata-from-bank-sync')
export class FakeDataFromBankSyncController {

    constructor(private readonly fakeDataFromBanSyncSvc: FakeDataFromBankSyncService) { }

    /**
    * Function that generate fake random movements for each 12 month
    * @param { boolean } withDuplicate  - if we want duplicated entries for each month
    * @returns {Array<Movement[]>} movements - simulated movements from scrapped source
   */
    @ApiTags('Generate fake movements data (for each 12 month)')
    @ApiResponse({ status: 200, description: 'Array of 12 months. Each Month contains a Movement Array' })
    @ApiResponse({ status: 500, description: 'Server error' })

    @Get()
    getFakeData(@Query('withDuplicate') withDuplicate?: boolean): Movement[] {
        console.log(withDuplicate)
        console.log(typeof (withDuplicate))
        let boolStr: any = withDuplicate;
        let withDuplicateItem: any = boolStr === 'true';
        console.log(withDuplicateItem)
        console.log(typeof (withDuplicateItem))
        const movementsFromSync: Movement[] = withDuplicateItem
            ? this.fakeDataFromBanSyncSvc.getFakeDataMovementsWithDuplicated()
            : this.fakeDataFromBanSyncSvc.getFakeDataMovements();
        return movementsFromSync;
    }

}
