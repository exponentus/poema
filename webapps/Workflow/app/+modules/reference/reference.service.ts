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

    getFormSchema(kind: string): any[] {
        return formSchemas[kind] || formSchemas._default;
    }
}

const formSchemas = {
    _default: [{
        tabTitle: 'properties',
        active: true,
        fieldsets: [{
            fields: [{
                type: 'text',
                label: 'name',
                name: 'name',
                className: 'span8',
                required: true
            }]
        }],
    }],
    country: [{
        tabTitle: 'properties',
        active: true,
        fieldsets: [{
            fields: [{
                type: 'text',
                label: 'name',
                name: 'name',
                className: 'span8',
                required: true
            }, {
                type: 'select',
                label: 'code',
                name: 'code',
                values: ['UNKNOWN', 'KZ', 'RU', 'BY', 'UA', 'DE', 'FR', 'TR', 'US', 'CN', 'BG', 'GB', 'JP', 'ES', 'PT'],
                className: 'span2',
                required: true
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedname',
                label: 'localizedname',
                className: 'span7',
                languages: ['rus', 'kaz', 'eng', 'spa', 'por', 'bul']
            }]
        }],
    }],
    region: [{
        tabTitle: 'properties',
        active: true,
        fieldsets: [{
            fields: [{
                type: 'text',
                label: 'name',
                name: 'name',
                className: 'span8',
                required: true
            }, {
                type: 'select',
                label: 'type',
                name: 'regiontype',
                className: 'span8',
                url: '',
                required: true
            }, {
                type: 'select',
                label: 'country',
                name: 'country',
                url: '',
                className: 'span8',
                required: true
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedname',
                label: 'localizedname',
                className: 'span7',
                languages: ['rus', 'kaz', 'eng', 'spa', 'por', 'bul']
            }]
        }],
    }]
}
