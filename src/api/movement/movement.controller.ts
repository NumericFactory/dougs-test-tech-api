import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { MovementService } from './movement.service';
import { BankBalance, Movement } from './models/data.model';
import { ApiResponse, ApiTags, ApiOperation, ApiAcceptedResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ErrorResponseWithReasons, Reason, Detail } from './models/response-with-reasons.model';
import { OkResponse } from './models/ok-response.model';
import { MovementsDto } from './dto/movements-by-month.dto';

@Controller('api/movements')
export class MovementController {

    constructor(private readonly movementSvc: MovementService) { }

    @ApiTags('validation of synchronisation')
    @ApiAcceptedResponse({ status: 202, description: 'Accepted', type: OkResponse })
    @ApiResponse({ status: 418, description: 'I\'m a teapot', type: ErrorResponseWithReasons })
    @HttpCode(202)
    @Post('validation')
    isSyncValid(
        @Body() data: any[],
    ) {
        console.log('data', data['bankStatements']);
        try {
            return this.movementSvc.isSyncValid(data['movements'], data['bankStatements']);
        }
        catch (error) {
            console.log('error isSync', error);
            return error;
        }
    }


    /**
     * Function that validate synchronization of scrapped Movements, 
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

    @Post('validation/remove-duplicates')
    validation(
        @Body() movements: Movement[],
    ): OkResponse | ErrorResponseWithReasons {
        try {
            const computed = this.movementSvc.removeDuplicateEntries(
                movements, {
                date: new Date('2023-10-31'), balance: 45
            });
            if (computed.isSyncValid && computed.removedDuplicatesEntries === 0) {
                return new OkResponse('Accepted'); // [202] { message: 'Accepted' }
            }
        }
        catch (error) {
            let reason!: Reason;
            console.log('error PERSO', error);
        }



    }





}
