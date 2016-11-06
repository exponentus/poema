import { Pipe } from '@angular/core';

@Pipe({ name: 'values' })
export class ValuesPipe {
    transform(values: any, args: string[]): any {
        return Object.keys(values).map(key => values[key]);
    }
}
