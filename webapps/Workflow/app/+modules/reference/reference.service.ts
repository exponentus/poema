import { Injectable } from '@angular/core';

import { DataService } from '../../services';

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

    save(entity: any, params: any) {
        return this.dataService.post('/Reference/' + entity.url.replace('&amp;', '&'), params, entity);
    }

    getFormSchema(kind: string): any[] {
        return formSchemas[kind] || formSchemas._default;
    }
}

const localizedNameCodes = ['RUS', 'KAZ', 'ENG', 'SPA', 'POR', 'BUL'];

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
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                values: { enum: ['KZ', 'RU', 'BY', 'UA', 'DE', 'FR', 'TR', 'US', 'CN', 'BG', 'GB', 'JP', 'ES', 'PT'] },
                className: 'span2',
                required: true
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                values: {
                    url: '/Reference/p?id=regiontype-view'
                },
                required: true
            }, {
                type: 'select',
                label: 'country',
                name: 'country',
                values: {
                    url: '/Reference/p?id=country-view'
                },
                className: 'span4',
                required: true
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                values: {
                    url: '/Reference/p?id=get-regions'
                },
                required: true
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                values: {
                    url: '/Reference/p?id=localitytype-view'
                }
            }, {
                type: 'select',
                label: 'region',
                name: 'region',
                className: 'span7',
                values: {
                    url: '/Reference/p?id=region-view'
                }
            }, {
                type: 'select',
                label: 'district',
                name: 'district',
                className: 'span7',
                values: {
                    url: '/Reference/p?id=district-view'
                }
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                values: {
                    url: '/Reference/p?id=locality-view'
                }
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
            }]
        }]
    }],
    position: [{
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
                label: 'rank',
                name: 'rank',
                className: 'span1'
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                values: { enum: localizedNameCodes },
                className: 'span2',
                required: true
            }]
        }, {
            title: 'localized_names',
            fields: [{
                type: 'localizedName',
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
            }]
        }]
    }],
    texttemplate: [{
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
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
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
                hideLabel: true,
                className: 'span7',
                languages: localizedNameCodes
            }]
        }]
    }]
}
