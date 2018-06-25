import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AppService, mdFormat, DATE_FORMAT, STAFF_URL } from '@nb/core';

import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'prj-dashboard',
    providers: [DashboardService],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

    STAFF_URL = STAFF_URL;
    intervalTimeout: number = 5 * 60 * 1000;
    data: any = {};
    interval: any;
    showReportModal: boolean = false;
    filter: any = {
        periodType: 'week'
    };

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

    load() {
        this.appService.showLoadSpinner();
        this.dashboardService.fetchData({
            assignee: this.filter.assignee ? this.filter.assignee.userID : null,
            periodType: this.filter.periodType || 'week',
            fromDate: mdFormat(this.filter.fromDate, DATE_FORMAT),
            toDate: mdFormat(this.filter.toDate, DATE_FORMAT)
        }).pipe(finalize(() => {
            this.appService.hideLoadSpinner();
        })).subscribe(response => {
            this.data = response.data;
        });
    }
}
