import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MovementService } from './movement.service';
import { ApiResponse, ApiTags, ApiAcceptedResponse } from '@nestjs/swagger';
import { ErrorResponseWithReasons } from './models/response-with-reasons.model';
import { OkResponse } from './models/ok-response.model';
import { movementAndBankStatementDto } from './dto/dto';

@Controller('api/movements')
export class MovementController {

    constructor(private readonly movementSvc: MovementService) { }

    @ApiTags('validation of synchronisation')
    @ApiAcceptedResponse({ status: 202, description: 'Accepted', type: OkResponse })
    @ApiResponse({ status: 418, description: 'I\'m a teapot', type: ErrorResponseWithReasons })
    @HttpCode(202)

    @Post('validation')
    isSyncValid(
        @Body() data: movementAndBankStatementDto,
        // @Query('removeDuplicateEntries') removeDuplicateEntries: boolean
    ): OkResponse | ErrorResponseWithReasons {
        try {
            return this.movementSvc.isSyncValid(data.movements, data.bankStatements);
        }
        catch (error) {
            console.log('error isSync', error);
            return error;
        }
    }

}
