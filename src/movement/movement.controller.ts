import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { MovementService } from './movement.service';
import { Movement } from './models/data.model';
import { ApiResponse, ApiTags, ApiOperation, ApiAcceptedResponse } from '@nestjs/swagger';
import { ErrorResponseWithReasons, Reason, Detail } from './models/response-with-reasons.model';
import { OkResponse } from './models/ok-response.model';

@Controller('movements')
export class MovementController {

    constructor(private readonly movementSvc: MovementService) { }

    /**
     * Function that generate fake random movements for each 12 month
     * @param { boolean } withDuplicate  - if we want duplicated entries for each month
     * @returns {Array<Movement[]>} movements - simulated movements from scrapped source
    */
    @ApiTags('Generate fake movements data (for each 12 month)')
    @ApiResponse({ status: 200, description: 'Array of 12 months. Each Month contains a Movement Array' })
    @ApiResponse({ status: 500, description: 'Server error' })

    @Get()
    getFakeData(@Query('withDuplicate') withDuplicate?: boolean): Array<Movement[]> {
        console.log(withDuplicate)
        let boolStr: any = withDuplicate;
        let withDuplicateItem: any = boolStr === 'true';
        const movementsFromSync: Array<Movement[]> = withDuplicateItem
            ? this.movementSvc.getFakeDataMovementsWithDuplicated()
            : this.movementSvc.getFakeDataMovements();
        return movementsFromSync;
    }


    /**
     * Function that validate syncrhonization of scrapped Movements, by compare with real bank balance
     * @param movements 
     * @returns 
     */
    @ApiTags('validation of synchronisation')
    @ApiAcceptedResponse({ status: 202, description: 'Accepted', type: OkResponse })
    @ApiResponse({ status: 418, description: 'I\'m a teapot', type: ErrorResponseWithReasons })
    @HttpCode(202)
    @Post('validation')
    validation(
        @Body() movements: any[],
        @Query('filterByMonth') filterByMonth: number,
    ): OkResponse | ErrorResponseWithReasons {
        const movementsByMonth = movements[filterByMonth - 1]; // get movements by month in queryParam
        const computed = this.movementSvc.removeDuplicatedEntries(
            movementsByMonth,
            { date: new Date('2023-10-31'), balance: 1748.6 }
        )
        let reason!: Reason;
        // CAS 1 : syncrhonization OK
        if (computed.isSyncValid && computed.duplicateEntriesWereCleared == 0) {
            return new OkResponse('Accepted'); // [202] { message: 'Accepted' }
        }
        // CAS 2 : syncrhonization is not OK - Reason: Duplicates entries were found and removed
        else if (computed.isSyncValid && computed.duplicateEntriesWereCleared > 0) {
            reason = {
                message: "Duplicates entries were found and removed. Cleared uniqueMovements are in response.info",
                info: new Detail(computed.duplicateEntriesWereCleared, computed.uniqueMovements, computed.balance)
            }
        }
        else if (!computed.isSyncValid) {
            switch (true) {
                // CAS 3 : syncrhonization is not OK - Reason: missing one or more entries
                case computed.duplicateEntriesWereCleared === 0:
                    reason = {
                        message: `Missing one more entries. Please compare movements with the bank statement of the month`,
                        info: new Detail(computed.duplicateEntriesWereCleared, computed.uniqueMovements, computed.balance)
                    }
                    break;
                // CAS 4 : syncrhonization is not OK - Reason: Duplicated Entries were found and removed. But missing one or more entries
                case computed.duplicateEntriesWereCleared > 0:
                    reason = {
                        message: `Duplicates entries were found and removed. Missing one more entries. Please compare unique movements with the bank statement of the month`,
                        info: new Detail(computed.duplicateEntriesWereCleared, computed.uniqueMovements, computed.balance)
                    }
                    break;
            }
        }
        // return 418 error with reason
        throw new HttpException( // 418
            { messages: 'I\'m a teapot', reasons: [reason] },
            HttpStatus.I_AM_A_TEAPOT
        );
    }
}
