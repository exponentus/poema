import * as moment from 'moment';

export function mdFormat(dateTime, format: string) {
    let md = moment(dateTime, format);
    if (md.isValid()) {
        return md.format(format);
    }
    return null;
}
