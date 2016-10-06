import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'acl',
    templateUrl: './acl.html'
})

export class AclComponent {
    @Input() acl: any = {};
}
