import { IEntity, IDto, IDtoConverter } from '@nb/core';
import {
    Incoming, Outgoing, OfficeMemo, Assignment, Approval,
    Approver, AssigneeEntry, Block, Report
} from './models';

export function getConverter(entityKind: string): IDtoConverter {
    switch (entityKind) {
        case 'Incoming':
            return Incoming;
        case 'Outgoing':
            return Outgoing;
        case 'OfficeMemo':
            return OfficeMemo;
        case 'Approval':
            return Approval;
        case 'Approver':
            return Approver;
        case 'AssigneeEntry':
            return AssigneeEntry;
        case 'Assignment':
            return Assignment;
        case 'Block':
            return Block;
        case 'Report':
            return Report;
        default:
            return DefaultConverter;
    }
}

export class DefaultConverter {
    static convertToDto(model: IEntity) {
        return model;
    }
}

export function convertToDto(model: IEntity): IDto {
    return getConverter(model.kind).convertToDto(model);
}
