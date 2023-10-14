import { Injectable } from '@nestjs/common';
import { Movement } from '../../api/movement/models/data.model';
import { generateMovements, generateMovementsWithDuplicatesEntries } from './fake-data';


@Injectable()
export class FakeDataRepository {

    getMovementsFromBankServiceSync(): Array<Movement[]> {
        return generateMovements();
    }

    getMovementsWithDuplicateFromBankServiceSync(): Array<Movement[]> {
        return generateMovementsWithDuplicatesEntries()
    }

}