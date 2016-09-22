import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgViewDirective, ImgViewComponent, ImgViewService } from './img-view';
import { PaginationComponent } from './pagination';
import { AutofocusDirective } from './directives/autofocus.directive';
import { DatepickerDirective } from './datepicker/datepicker';
import { DropdownComponent, DropdownToggleComponent } from './dropdown';
import { Tabs, Tab } from './tabs';
import { SwitchButtonComponent } from './switch-button';
import { NotificationComponent, NotificationService } from './notification';
import { MarkdownEditorComponent, MarkdownConverter, MarkedPipe } from './markdown';
import { ExpandableCellComponent } from './expandable-cell/expandable-cell.component';

@NgModule({
    declarations: [
        PaginationComponent,
        NotificationComponent,
        AutofocusDirective,
        DatepickerDirective,
        Tabs, Tab,
        DropdownComponent, DropdownToggleComponent,
        MarkdownEditorComponent, MarkedPipe,
        SwitchButtonComponent,
        ImgViewDirective, ImgViewComponent,
        ExpandableCellComponent
    ],
    exports: [
        PaginationComponent,
        NotificationComponent,
        AutofocusDirective,
        DatepickerDirective,
        Tabs, Tab,
        DropdownComponent, DropdownToggleComponent,
        MarkdownEditorComponent, MarkedPipe,
        SwitchButtonComponent,
        ImgViewDirective, ImgViewComponent,
        ExpandableCellComponent
    ],
    imports: [CommonModule],
    providers: [
        NotificationService,
        ImgViewService,
        MarkdownConverter
    ]
})

export class SharedModule { }
