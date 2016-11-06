import { Pipe } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe {
    transform(value, args: string[]): any {
        let keys = [];
        for (let key in value) {
            keys.push(key);
        }
        return keys;
    }
}
