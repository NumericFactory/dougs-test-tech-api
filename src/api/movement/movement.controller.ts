import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { MovementService } from './movement.service';
import { BankBalance, Movement } from './models/data.model';
import { ApiResponse, ApiTags, ApiAcceptedResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ErrorResponseWithReasons, Reason } from './models/response-with-reasons.model';
import { OkResponse } from './models/ok-response.model';

@Controller('api/movements')
export class MovementController {

    constructor(private readonly movementSvc: MovementService) { }

    @ApiTags('validation of synchronisation')
    @ApiAcceptedResponse({ status: 202, description: 'Accepted', type: OkResponse })
    @ApiResponse({ status: 418, description: 'I\'m a teapot', type: ErrorResponseWithReasons })
    @HttpCode(202)

    @Post('validation')
    isSyncValid(
        @Body() data: { movements: Movement[], bankStatements: BankBalance[] },
        @Query('removeDuplicateEntries') removeDuplicateEntries: boolean
    ) {
        try {
            return this.movementSvc.isSyncValid(data['movements'], data['bankStatements']);
        }
        catch (error) {
            console.log('error isSync', error);
            return error;
        }
    }

}
