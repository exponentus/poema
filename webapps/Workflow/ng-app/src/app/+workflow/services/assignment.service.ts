import { Injectable } from '@angular/core';

import { IDto, IEntityService } from '@nb/core';
import { DataService } from '@nb/core';
import { createApiUrl } from '@nb/core';
import { Assignment, AssigneeEntry } from '../models';
import { WF_URL } from '../constants';

@Injectable()
export class AssignmentService implements IEntityService<Assignment> {

    constructor(
        private dataService: DataService
    ) { }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: Assignment): IDto {
        return Assignment.convertToDto(model);
    }

    resetAssignee(model: Assignment, entries: AssigneeEntry[]) {
        let url = `${WF_URL.API_ASSIGNMENTS}/action/resetAssignee`;
        let payload = {
            assignment: {
                id: model.id,
                assigneeEntries: entries.map(it => { return { assignee: { id: it.assignee.id } }; })
            }
        };
        return this.dataService.apiPost(url, {}, payload);
    }
}
