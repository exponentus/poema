import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { ControlStatusType } from '../models/constants/types';

@Injectable()
export class ControlService {

    // controlStatusTypes: Subject<{ id: ControlStatusType, name: string }[]> = new Subject();

    constructor(
        private translate: TranslateService
    ) {
        // this.fetchControlStatusTypes();
    }

    // fetchControlStatusTypes() {
    //     this.translate.get(['draft', 'open', 'processing', 'pending', 'completed', 'cancelled']).map(t => [
    //         { id: 'DRAFT' as ControlStatusType, name: t.draft },
    //         { id: 'OPEN' as ControlStatusType, name: t.open },
    //         { id: 'PROCESSING' as ControlStatusType, name: t.processing },
    //         { id: 'PENDING' as ControlStatusType, name: t.pending },
    //         { id: 'COMPLETED' as ControlStatusType, name: t.completed },
    //         { id: 'CANCELLED' as ControlStatusType, name: t.cancelled }
    //     ]).subscribe(result => this.controlStatusTypes.next(result));
    // }
}
