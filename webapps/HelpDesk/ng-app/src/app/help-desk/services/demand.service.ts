import { Injectable } from '@angular/core';

import { IEntity, IDto, IEntityService, IFormSchema } from '@nb/core';
import { DataService } from '@nb/core';
import { createApiUrl } from '@nb/core';
import { STAFF_URL } from '@nb/core';
import { REFERENCE_URL } from '@nb/core';
import { HELP_DESK_URL } from '../constants';
import { Demand } from '../models';

@Injectable()
export class DemandService implements IEntityService<IEntity> {

    constructor(
        private dataService: DataService
    ) { }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: IEntity): IDto {
        let demand: Demand = <any>model;
        return Demand.convertToDto(demand);
    }

    // getFormSchema(): IFormSchema[] {
    //     return [{
    //         tabTitle: 'properties',
    //         active: true,
    //         fieldsets: [{
    //             fields: [{
    //                 type: 'select',
    //                 label: 'demand_type',
    //                 name: 'demandType',
    //                 placeHolder: 'select',
    //                 className: 'span8',
    //                 values: {
    //                     url: REFERENCE_URL.API_DEMAND_TYPES
    //                 }
    //             }, {
    //                 type: 'select',
    //                 label: 'customer',
    //                 name: 'customer',
    //                 placeHolder: 'select',
    //                 className: 'span8',
    //                 required: true,
    //                 values: {
    //                     url: STAFF_URL.API_ORGANIZATIONS
    //                 }
    //             }, {
    //                 type: 'select',
    //                 label: 'project',
    //                 name: 'project',
    //                 placeHolder: 'select',
    //                 className: 'span8',
    //                 required: true,
    //                 values: {
    //                     url: HELP_DESK_URL.API_PROJECTS
    //                 }
    //             }, {
    //                 type: 'select',
    //                 label: 'tags',
    //                 name: 'tags',
    //                 placeHolder: 'select',
    //                 className: ['span8', 'tags-input'],
    //                 styler: (m: any) => { return { color: m.color }; },
    //                 values: {
    //                     url: `${REFERENCE_URL.API_TAGS}?hidden=false&category=software_developing_demand`,
    //                     multiple: true
    //                 }
    //             }, {
    //                 type: 'markdown',
    //                 label: 'body',
    //                 name: 'body',
    //                 fgClassName: 'vertical-md'
    //             }, {
    //                 type: 'attachment',
    //                 name: 'attachment',
    //                 hideLabel: true
    //             }]
    //         }]
    //     }];
    // }
}
