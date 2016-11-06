import { Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateDuration' })
export class DateDurationPipe {
    transform(dateStart: string, dateEnd: string): string {
        if (!dateStart && !dateEnd) {
            return '';
        }

        let sd, ed, dd;

        if (dateStart === 'now') {
            sd = moment();
        } else {
            sd = moment(dateStart, 'DD.MM.YYYY');
        }

        ed = moment(dateEnd, 'DD.MM.YYYY');
        dd = ed.diff(sd, 'days');

        return dd ? `(${dd.toString()})` : '';
    }
}
