import { AppService } from './app.service';
import { TranslateService } from './translate.service';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { ReferenceService } from './reference.service';
import { StaffService } from './staff.service';
import { UploadService } from './upload.service';

export { AppService };
export { TranslateService };
export { ProjectService };
export { TaskService };
export { ReferenceService };
export { StaffService };
export { UploadService };

export const APP_SERVICES = [
    AppService,
    TranslateService,
    ProjectService,
    TaskService,
    ReferenceService,
    StaffService
];
