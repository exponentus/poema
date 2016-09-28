import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgViewDirective, ImgViewComponent, ImgViewService } from './img-view';
import { PaginationComponent } from './pagination';
import { AutofocusDirective } from './directives/autofocus.directive';
import { TextareaAutoSizeDirective } from './directives/textarea-autosize.directive';
import { DatepickerDirective } from './datepicker/datepicker';
import { DropdownComponent, DropdownToggleComponent } from './dropdown';
import { Tabs, Tab } from './tabs';
import { SwitchButtonComponent } from './switch-button';
import { NotificationComponent, NotificationService } from './notification';
import { MarkdownEditorComponent, MarkdownConverter, MarkedPipe } from './markdown';
import { TreeIndentationComponent } from './tree-indentation/tree-indentation.component';
import { SortLabelComponent } from './sort-label/sort-label.component';

@NgModule({
    declarations: [
        PaginationComponent,
        NotificationComponent,
        AutofocusDirective,
        TextareaAutoSizeDirective,
        DatepickerDirective,
        Tabs, Tab,
        DropdownComponent, DropdownToggleComponent,
        MarkdownEditorComponent, MarkedPipe,
        SwitchButtonComponent,
        ImgViewDirective, ImgViewComponent,
        TreeIndentationComponent,
        SortLabelComponent
    ],
    exports: [
        PaginationComponent,
        NotificationComponent,
        AutofocusDirective,
        TextareaAutoSizeDirective,
        DatepickerDirective,
        Tabs, Tab,
        DropdownComponent, DropdownToggleComponent,
        MarkdownEditorComponent, MarkedPipe,
        SwitchButtonComponent,
        ImgViewDirective, ImgViewComponent,
        TreeIndentationComponent,
        SortLabelComponent
    ],
    imports: [CommonModule],
    providers: [
        NotificationService,
        ImgViewService,
        MarkdownConverter
    ]
})

export class SharedModule { }
