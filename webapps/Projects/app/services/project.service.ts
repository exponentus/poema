import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { Project, Attachment } from '../models';
import { createURLSearchParams, parseResponseObjects, serializeObj, transformPostResponse } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class ProjectService {

    constructor(
        private http: Http,
        private translate: TranslateService
    ) { }

    getProjectStatusTypes() {
        return this.translate.get(['draft', 'active', 'completed']).map(t => [
            { value: 'DRAFT', text: t.draft, default: true },
            { value: 'ACTIVE', text: t.active },
            { value: 'COMPLETED', text: t.completed }
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
                    meta: data.meta
                };
            });
    }

    fetchProjectById(projectId: string) {
        let url = 'p?id=project-form&projectId=' + (projectId !== 'new' ? projectId : '');
        return this.http.get(url, { headers: HEADERS })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                let project = <Project>data.project;
                if (!project.id) {
                    project.id = '';
                }
                if (data.fsid) {
                    project.fsid = data.fsid;
                }
                if (data.ACL) {
                    project.acl = data.ACL;
                }
                if (data.attachment) {
                    project.attachments = data.attachment.list;
                }
                return {
                    project: <Project>project,
                    actions: data.actions
                }
            });
    }

    saveProject(project: Project) {
        let url = 'p?id=project-form&projectId=' + (project.id ? project.id : '');
        return this.http.post(url, serializeObj(project), { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteProject(projects: Project[]) {
        return this.http.delete('p?id=project-view&projectIds=' + projects.map(it => it.id).join(','), { headers: HEADERS })
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteProjectAttachment(project: Project, attachment: Attachment) {
        return this.http.delete('p?id=project-form&projectId=' + project.id + '&attachmentId=' + attachment.id + '&fsid=' + project.fsid, { headers: HEADERS })
            .catch(error => Observable.throw(transformPostResponse(error)));
    }
}
