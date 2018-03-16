import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IViewPage } from '@nb/core';
import { DataService } from '@nb/core';

import { PROJECTS_URL } from '../constants';
import { Task } from '../models';

@Injectable()
export class DashboardService {

    constructor(
        private ngxTranslate: TranslateService,
        private dataService: DataService
    ) { }

    fetchData() {
        return this.dataService.apiGet(PROJECTS_URL.API_DASHBOARD).map(data => {
            return {
                id: data.id,
                title: data.title,
                data: {
                    // statAssigneeState: this.createTimeChartConfig(data.payload.statistic1),
                    // statAuthorState: this.createTimeChartConfig(data.payload.statistic2),
                    statAssigneeState: this.createTimeChartConfig2(data.payload.statAssigneeStateProcessing, data.payload.statAssigneeStateCompleted),
                    // statAuthorState: this.createTimeChartConfig2(data.payload.statAuthorStateProcessing, data.payload.statAuthorStateCompleted),
                    // tasksDueToday: data.payload.tasksDueToday as IViewPage,
                    // tasksExpired: data.payload.tasksExpired as IViewPage,
                    // tasksIn7Day: data.payload.tasksIn7Day as IViewPage,
                    taskStatusStat: data.payload.taskStatusStat,
                    exportFormatType: data.payload.exportFormatType
                }
            };
        });
    }

    private createTimeChartConfig2(
        statProc: { title: string, status: string, count: number, values: { [key: string]: number } },
        statCompl: { title: string, status: string, count: number, values: { [key: string]: number } }
    ) {
        let datasetsProc = {
            label: statProc.status || '',
            data: [],
            fill: false,
            lineTension: 0,
            borderColor: 'rgba(255,163,45,1)',
            backgroundColor: 'rgba(255,163,45,1)',
            pointBorderColor: 'rgba(255,163,45,1)',
            pointBackgroundColor: 'rgba(255,163,45,1)'
        },
            datasetsCompl = {
                label: statCompl.status || '',
                data: [],
                hidden: true,
                fill: false,
                lineTension: 0,
                borderColor: 'rgba(8,137,229,1)',
                backgroundColor: 'rgba(8,137,229,1)',
                pointBorderColor: 'rgba(8,137,229,1)',
                pointBackgroundColor: 'rgba(8,137,229,1)'
            },
            minValue: number = Number.MAX_VALUE,
            labels: string[] = Object.keys(statProc.values).concat(Object.keys(statCompl.values));

        for (let key of labels) {
            if (statProc.values[key]) {
                datasetsProc.data.push(statProc.values[key]);
                if (minValue > statProc.values[key]) {
                    minValue = +statProc.values[key];
                }
            } else {
                datasetsProc.data.push(0);
            }

            if (statCompl.values[key]) {
                datasetsCompl.data.push(statCompl.values[key]);
                if (minValue > statCompl.values[key]) {
                    minValue = +statCompl.values[key];
                }
            } else {
                datasetsCompl.data.push(0);
            }
        }

        if (!labels.length) {
            minValue = 0;
        } else {
            minValue--;
        }

        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [datasetsProc, datasetsCompl]
            },
            options: {
                legend: { display: true, labels: { fontColor: 'black' } },
                responsive: true,
                maintainAspectRatio: false,
                spanGaps: false,
                elements: { line: { tension: 0 } },
                tooltips: { mode: 'index', intersect: false },
                hover: { mode: 'nearest', intersect: true },
                scales: {
                    yAxes: [{
                        ticks: { min: minValue, stepSize: 1 }
                    }]
                }
            }
        };
    }

    private createTimeChartConfig(stat: { title: string, status: string, count: number, values: { [key: string]: number } }) {

        let labels: string[] = [],
            datasets = {
                label: stat.status || '',
                data: [],
                fill: false,
                lineTension: 0,
                borderColor: 'rgba(8,137,229,1)',
                backgroundColor: 'rgba(8,137,229,1)',
                pointBorderColor: 'rgba(8,137,229,1)',
                pointBackgroundColor: 'rgba(8,137,229,1)'
            },
            minValue: number = Number.MAX_VALUE;

        for (let key of Object.keys(stat.values)) {
            labels.push(key);
            datasets.data.push(stat.values[key]);
            if (minValue > stat.values[key]) {
                minValue = +stat.values[key];
            }
        }
        if (!labels.length) {
            minValue = 0;
        } else {
            minValue--;
        }

        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [datasets]
            },
            options: {
                legend: { display: true, labels: { fontColor: 'black' } },
                responsive: true,
                maintainAspectRatio: false,
                spanGaps: false,
                elements: { line: { tension: 0 } },
                tooltips: { mode: 'index', intersect: false },
                hover: { mode: 'nearest', intersect: true },
                scales: {
                    yAxes: [{
                        ticks: { min: minValue, stepSize: 1 }
                    }]
                }
            }
        };
    }

    private createChartConfig(list: { title: string, count: number }[]) {

        let labels: string[] = [],
            datasets = {
                label: '',
                data: [],
                fill: false,
                lineTension: 0
            };

        list.forEach(it => {
            labels.push(this.ngxTranslate.instant(it.title.toLowerCase()));
            datasets.data.push(+it.count);
        });

        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [datasets]
            },
            options: {
                legend: { display: true, labels: { fontColor: 'black' } },
                responsive: true,
                maintainAspectRatio: false,
                tooltips: { mode: 'index', intersect: false },
                hover: { mode: 'nearest', intersect: true },
                scales: { 'yAxes': [{ 'ticks': { 'beginAtZero': true } }] }
            }
        };
    }
}
