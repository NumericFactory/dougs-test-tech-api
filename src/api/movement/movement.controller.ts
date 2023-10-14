import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { MovementService } from './movement.service';
import { Movement } from './models/data.model';
import { ApiResponse, ApiTags, ApiOperation, ApiAcceptedResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ErrorResponseWithReasons, Reason, Detail } from './models/response-with-reasons.model';
import { OkResponse } from './models/ok-response.model';
import { MovementsByMonthDto } from './dto/movements-by-month.dto';

@Controller('api/movements')
export class MovementController {

    constructor(private readonly movementSvc: MovementService) { }

    /**
     * Function that validate syncrhonization of scrapped Movements, 
     * by compare with real bank balance
     * @param movements 
     * @returns OkResponse | ErrorResponseWithReasons
     */
    @ApiTags('validation of synchronisation')
    @ApiAcceptedResponse({ status: 202, description: 'Accepted', type: OkResponse })
    @ApiResponse({ status: 418, description: 'I\'m a teapot', type: ErrorResponseWithReasons })
    @ApiQuery({ name: 'filterByMonth', required: false, type: Number, description: 'Month (1 to 12)' })
    @ApiOperation({ summary: 'Validate synchronization of scrapped movements with real bank balance' })
    @HttpCode(202)

    @Post('validation')
    validation(
        @Body() movements: MovementsByMonthDto,
        @Query('filterByMonth') filterByMonth?: number): OkResponse | ErrorResponseWithReasons {

        const movementsByMonth = filterByMonth // get movements by month in queryParam
            ? movements[filterByMonth - 1]
            : movements[new Date().getMonth()];
        const computed = this.movementSvc.removeDuplicateEntries(
            movementsByMonth,
            { date: new Date('2023-10-31'), balance: 1748.6 }
        )
        let reason!: Reason;
        // CAS 1: syncrhonization OK
        if (computed.isSyncValid && computed.duplicateEntriesWereCleared === 0) {
            return new OkResponse('Accepted'); // [202] { message: 'Accepted' }
        }
        // CAS 2: syncrhonization is not OK - Reason: Duplicates entries were found and removed
        if (computed.isSyncValid && computed.duplicateEntriesWereCleared > 0) {
            reason = {
                message: "Duplicates entries were found and removed. Cleared uniqueMovements are in response.info",
                info: new Detail(computed.duplicateEntriesWereCleared, computed.uniqueMovements, computed.balance)
            }
            throw new HttpException({ messages: 'I\'m a teapot', reasons: [reason] }, HttpStatus.I_AM_A_TEAPOT); // [418]
        }
        // CAS 3: syncrhonization is not OK - Reason: missing one or more entries
        if (!computed.isSyncValid && computed.duplicateEntriesWereCleared === 0) {
            reason = {
                message: `Missing one more entries. Please compare movements with the bank statement of the month`,
                info: new Detail(computed.duplicateEntriesWereCleared, computed.uniqueMovements, computed.balance)
            }
            throw new HttpException({ messages: 'I\'m a teapot', reasons: [reason] }, HttpStatus.I_AM_A_TEAPOT); // [418]
        }
        // CAS 4: syncrhonization is not OK - Reason: Duplicated Entries were found and removed. But missing one or more entries
        if (!computed.isSyncValid && computed.duplicateEntriesWereCleared > 0) {
            reason = {
                message: `Duplicates entries were found and removed. Missing one more entries. Please compare unique movements with the bank statement of the month`,
                info: new Detail(computed.duplicateEntriesWereCleared, computed.uniqueMovements, computed.balance)
            }
            throw new HttpException({ messages: 'I\'m a teapot', reasons: [reason] }, HttpStatus.I_AM_A_TEAPOT); // [418]
        }
    }



}
