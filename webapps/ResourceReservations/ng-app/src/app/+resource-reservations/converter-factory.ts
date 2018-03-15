import { IEntity, IDto, IDtoConverter } from '@nb/core';
import { ApplicationForMeetingRoom, ApplicationForVehicle } from './models';

export function getConverter(entityKind: string): IDtoConverter {
    switch (entityKind) {
        case 'ApplicationForMeetingRoom':
            return ApplicationForMeetingRoom;
        case 'ApplicationForVehicle':
            return ApplicationForVehicle;
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
