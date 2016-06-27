import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {
    FETCH_PROJECTS,
    FETCH_PROJECT,
    ADD_PROJECT
} from '../reducers/projects.reducer';
import {
    Project,
    Task,
    TaskType,
    Tag,
    User,
    Attachment,
    Organization
} from '../models';
import { createURLSearchParams, serializeObj } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class ProjectService {

    constructor(
        private store: Store<any>,
        private http: Http,
        private translate: TranslateService
    ) { }

    getProjectStatusTypes() {
        return this.translate.get(['draft', 'processed', 'finished']).map(t => [
            { value: 'DRAFT', text: t.draft, default: true },
            { value: 'PROCESSED', text: t.processed },
            { value: 'FINISHED', text: t.finished }
        ]);
    }

    fetchProjects(queryParams = {}) {
        return this.http.get('p?id=project-view', {
            headers: HEADERS,
            search: createURLSearchParams(queryParams)
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    projects: <Project[]>data.list,
                    meta: data.meta,
                    loading: true
                }
            });
    }

    fetchProjectById(projectId: string) {
        if (projectId === 'new') {
            return Observable.of(new Project());
        }

        return this.http.get('p?id=project-form&projectId=' + projectId, { headers: HEADERS })
            .map(response => <Project>response.json().objects[0]);
    }

    saveProject(project: Project) {
        let url = 'p?id=project-form&projectId=' + project.id;
        return this.http.post(url, serializeObj(project), { headers: HEADERS })
            .map(response => this.transformPostResponse(response))
            .catch(error => Observable.throw(this.transformPostResponse(error)));
    }

    deleteProject(projects: Project[]) {
        return this.http.delete('p?id=project-view&ids=' + projects.map(it => it.id).join(','));
    }

    private transformPostResponse(response: Response) {
        let json = response.json();
        return Object.assign(json, {
            ok: json.type === 'DOCUMENT_SAVED',
            message: json.captions ? json.captions.type : json.message
        });
    }
}
