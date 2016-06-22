import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[dashboard]',
    template: 'dashboard'
})

export class DashboardComponent {
    constructor(private router: Router) {

    }
}
