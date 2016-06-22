import { AppService } from './app.service';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { ReferenceService } from './reference.service';
import { StaffService } from './staff.service';

export { AppService };
export { ProjectService };
export { TaskService };
export { ReferenceService };
export { StaffService };

export const APP_SERVICES = [
    AppService, ProjectService, TaskService, ReferenceService, StaffService
];
