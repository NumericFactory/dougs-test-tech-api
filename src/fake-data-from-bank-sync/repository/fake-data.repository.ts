import { Injectable } from '@nestjs/common';
import { Movement } from '../../api/movement/models/data.model';
import * as fakeData from './fake-data';


@Injectable()
export class FakeDataRepository {

    getMovementsFromBankServiceSync(): Movement[] {
        return fakeData.generateMovements();

    }

    getMovementsWithDuplicateFromBankServiceSync(): Movement[] {
        return fakeData.generateMovementsWithDuplicatesEntries()
    }

}