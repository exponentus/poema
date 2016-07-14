import { Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFmt' })
export class DateFormatPipe {
    transform(date: string, format: string): string {
        if (!date) {
            return '';
        }

        if (!format) {
            format = 'DD.MM.YYYY HH:mm';
        }

        let md = moment(date, format);

        if (md.isValid()) {
            return md.format(format);
        }

        return '';
    }
}
