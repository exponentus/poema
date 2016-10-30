import { Component, Input } from '@angular/core';

@Component({
    selector: 'schema-form',
    templateUrl: './schema-form.html',
})

export class SchemaFormComponent {
    @Input('schema') formSchema: any[] = [];
    @Input() model: any;
}
