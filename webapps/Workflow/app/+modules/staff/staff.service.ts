import { Injectable } from '@angular/core';

import { DataService } from '../../services';
import { Organization, Employee } from './models';

@Injectable()
export class StaffService {

    constructor(
        private dataService: DataService
    ) { }

    fetch(params: any, retry = 1) {
        return this.dataService.get('/Staff/p', params, retry);
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
                className: 'span7',
                required: true
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                className: 'span7',
                languages: ['RUS', 'KAZ', 'ENG', 'SPA', 'POR', 'BUL']
            }]
        }]
    }],
    organization: [{
        tabTitle: 'properties',
        active: true,
        fieldsets: [{
            fields: [{
                type: 'text',
                label: 'name',
                name: 'name',
                className: 'span7',
                required: true
            }, {
                type: 'select',
                label: 'orgcategory',
                name: 'orgcategory',
                url: '/Reference/p?id=orgcategory-view',
                className: 'span4',
                required: true
            }, {
                type: 'text',
                label: 'bin',
                name: 'bin',
                className: 'span4',
                required: true
            }, {
                type: 'checkbox',
                label: 'labels',
                name: 'labels',
                values: []
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                className: 'span7',
                languages: ['RUS', 'KAZ', 'ENG', 'SPA', 'POR', 'BUL']
            }]
        }]
    }],
    department: [{
        tabTitle: 'properties',
        active: true,
        fieldsets: [{
            fields: [{
                type: 'select',
                label: 'organization',
                name: 'organization',
                url: '/Staff/p?id=organization-view',
                className: 'span6',
                required: true
            }, {
                type: 'text',
                label: 'name',
                name: 'name',
                className: 'span6',
                required: true
            }, {
                type: 'select',
                label: 'departmenttype',
                name: 'departmenttype',
                url: '/Reference/p?id=departmenttype-view',
                className: 'span6'
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                className: 'span7',
                languages: ['RUS', 'KAZ', 'ENG', 'SPA', 'POR', 'BUL']
            }]
        }]
    }],
    employee: [{
        tabTitle: 'properties',
        active: true,
        fieldsets: [{
            fields: [{
                type: 'attachment',
                name: 'avatar'
            }]
        }, {
            fields: [{
                type: 'text',
                label: 'name',
                name: 'name',
                className: 'span6',
                required: true
            }, {
                type: 'text',
                label: 'iin',
                name: 'iin',
                className: 'span4'
            }, {
                type: 'select',
                label: 'organization',
                name: 'organization',
                url: '/Staff/p?id=organization-view',
                className: 'span6',
                required: true
            }, {
                type: 'select',
                label: 'department',
                name: 'department',
                url: '/Staff/p?id=department-view',
                className: 'span6'
            }, {
                type: 'select',
                label: 'position',
                name: 'position',
                url: '/Reference/p?id=position-view',
                className: 'span6'
            }, {
                type: 'checkbox',
                label: 'roles',
                name: 'role',
                values: []
            }, {
                type: 'text',
                label: 'login',
                name: 'login',
                className: 'span6',
                required: true
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                className: 'span7',
                languages: ['RUS', 'KAZ', 'ENG', 'SPA', 'POR', 'BUL']
            }]
        }]
    }],
    role: [{
        tabTitle: 'properties',
        active: true,
        fieldsets: [{
            fields: [{
                type: 'text',
                label: 'name',
                name: 'name',
                className: 'span7',
                required: true
            }, {
                type: 'textarea',
                label: 'description',
                name: 'description',
                className: 'span7'
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                className: 'span7',
                languages: ['RUS', 'KAZ', 'ENG', 'SPA', 'POR', 'BUL']
            }]
        }]
    }],
    organizationlabel: [{
        tabTitle: 'properties',
        active: true,
        fieldsets: [{
            fields: [{
                type: 'text',
                label: 'name',
                name: 'name',
                className: 'span7',
                required: true
            }, {
                type: 'textarea',
                label: 'description',
                name: 'description',
                className: 'span7'
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                className: 'span7',
                languages: ['RUS', 'KAZ', 'ENG', 'SPA', 'POR', 'BUL']
            }]
        }]
    }]
}
