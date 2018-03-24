import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IAction, AppService } from '@nb/core';

import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'prj-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

    intervalTimeout: number = 60 * 1000;
    data: any = {};
    interval: any;
    showReportModal: boolean = false;
    actions: IAction[] = [{
        caption: 'reports',
        customID: 'reports'
    }];

    constructor(
        private router: Router,
        public appService: AppService,
        private dashboardService: DashboardService
    ) { }

    ngOnInit() {
        this.appService.setRedirectUrl(this.router.url);
        this.load();

        this.interval = setInterval(() => { this.load(); }, this.intervalTimeout);
    }

    ngOnDestroy() {
        this.interval && clearInterval(this.interval);
    }

    onAction(action: IAction) {
        this.showReportModal = true;
    }

    load() {
        this.appService.showLoadSpinner();
        this.dashboardService.fetchData().finally(() => {
            this.appService.hideLoadSpinner();
        }).subscribe(response => {
            this.data = response.data;
        });
    }
}
