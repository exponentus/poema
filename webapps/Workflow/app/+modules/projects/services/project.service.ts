import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { AppService } from '../../../services';
import { Attachment } from '../../../models/attachment';
import { Project } from '../models';
import { xhrHeaders, createURLSearchParams, parseResponseObjects, serializeObj, transformPostResponse } from '../../../utils/utils';

@Injectable()
export class ProjectService {

    constructor(
        private http: Http,
        private translate: TranslateService,
        private appService: AppService
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
            headers: xhrHeaders(),
            search: createURLSearchParams(queryParams)
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    projects: <Project[]>data.list,
                    meta: data.meta
                };
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchProjectById(projectId: string) {
        let url = 'p?id=project-form&projectId=' + (projectId !== 'new' ? projectId : '');

        return this.http.get(url, { headers: xhrHeaders() })
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
            })
            .catch(error => this.appService.handleError(error));
    }

    saveProject(project: Project) {
        let url = 'p?id=project-form&projectId=' + (project.id ? project.id : '');

        return this.http.post(url, serializeObj(project), { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }

    deleteProject(projects: Project[]) {
        let url = 'p?id=project-view&projectIds=' + projects.map(it => it.id).join(',');

        return this.http.delete(url, { headers: xhrHeaders() })
            .catch(error => this.appService.handleError(error));
    }

    deleteProjectAttachment(project: Project, attachment: Attachment) {
        let url = 'p?id=project-form&projectId=' + project.id + '&attachmentId=' + attachment.id + '&fsid=' + project.fsid;

        return this.http.delete(url, { headers: xhrHeaders() })
            .catch(error => this.appService.handleError(error));
    }
}
