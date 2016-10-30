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
    country: [{
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
                label: 'code',
                name: 'code',
                values: ['KZ', 'RU', 'BY', 'UA', 'DE', 'FR', 'TR', 'US', 'CN', 'BG', 'GB', 'JP', 'ES', 'PT'],
                className: 'span2',
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
    region: [{
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
                label: 'type',
                name: 'type',
                className: 'span4',
                url: '/Reference/p?id=regiontype-view',
                required: true
            }, {
                type: 'select',
                label: 'country',
                name: 'country',
                url: '/Reference/p?id=country-view',
                className: 'span4',
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
    district: [{
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
                label: 'type',
                name: 'region',
                className: 'span7',
                url: '/Reference/p?id=get-regions',
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
    locality: [{
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
                label: 'type',
                name: 'localityType',
                className: 'span7',
                url: '/Reference/p?id=localitytype-view'
            }, {
                type: 'select',
                label: 'region',
                name: 'region',
                className: 'span7',
                url: '/Reference/p?id=region-view'
            }, {
                type: 'select',
                label: 'district',
                name: 'district',
                className: 'span7',
                url: '/Reference/p?id=district-view'
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
    citydistrict: [{
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
                label: 'locality',
                name: 'locality',
                className: 'span7',
                url: '/Reference/p?id=locality-view'
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
    documentlanguage: [{
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
                label: 'code',
                name: 'code',
                values: ['RUS', 'KAZ', 'ENG', 'SPA', 'POR', 'BUL'],
                className: 'span2',
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
    documenttype: [{
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
                type: 'text',
                label: 'category',
                name: 'category',
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
    documentsubject: [{
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
                type: 'text',
                label: 'category',
                name: 'category',
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
    controltype: [{
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
                type: 'number',
                label: 'default_hours',
                name: 'defaultHours',
                className: 'span1',
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
    tag: [{
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
                type: 'text',
                label: 'category',
                name: 'category',
                className: 'span7',
                required: true
            }, {
                type: 'color',
                label: 'color',
                name: 'color',
                className: 'span2'
            }, {
                type: 'checkbox',
                name: 'hidden',
                values: [{ value: 'true', label: 'hidden' }]
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
    tasktype: [{
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
                type: 'text',
                label: 'prefix',
                name: 'prefix',
                className: 'span2',
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
    }]
}
