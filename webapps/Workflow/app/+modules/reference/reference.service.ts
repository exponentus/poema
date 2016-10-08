import { Injectable } from '@angular/core';

import { DataService } from '../../services';
import { Tag, TaskType, RequestType } from './models';

@Injectable()
export class ReferenceService {

    constructor(
        private dataService: DataService
    ) { }

    fetch(params: any, retry = 1) {
        return this.dataService.get('/Reference/p', params, retry);
    }

    fetchOne(params: any) {
        return this.fetch(params);
    }

    fetchTags() {
        return this.fetch({ id: 'tags' }, 2).map(payload => {
            return {
                tags: <Tag[]>payload.list,
                meta: payload.meta
            }
        });
    }

    fetchTaskTypes() {
        return this.fetch({ id: 'tasktypes' }, 2).map(payload => {
            return {
                taskTypes: <TaskType[]>payload.list,
                meta: payload.meta
            }
        });
    }

    fetchRequestTypes() {
        return this.fetch({ id: 'request-types' }, 2).map(payload => {
            return {
                requestTypes: <RequestType[]>payload.list,
                meta: payload.meta
            }
        });
    }
}
