import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '@nb/core';

const statusColors = {
    PROCESSING: '#ffeb3b',
    OPEN: '#dfe0ff',
    PENDING: '#ff9800',
    COMPLETED: '#b6de88'
};

interface IChartDataset {
    labels: string[];
    datasets: [{
        id: string, label: string, data: number[]
    }];
}

@Injectable()
export class DashboardService {

    constructor(
        private ngxTranslate: TranslateService,
        private dataService: DataService
    ) { }

    fetchData(filter: any) {
        return this.dataService.apiGet('/Projects/api/dashboard', filter).map(data => {
            return {
                id: data.id,
                title: data.title,
                data: {
                    chart: this.convertChartPayloadData(data.payload.chart),
                    taskStatusStats: data.payload.taskStatusStats,
                    exportFormatType: data.payload.exportFormatType,
                    isProjectSupervisor: data.payload.isProjectSupervisor
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
                        ticks: { min: minValue }
                    }]
                }
            }
        };
    }

    convertChartPayloadData(data: IChartDataset) {
        let minValue: number = Number.MAX_VALUE;
        let datasets: any[] = data.datasets.map(it => {
            for (let _value of it.data) {
                if (minValue > _value) {
                    minValue = +_value;
                }
            }

            return {
                id: it.id,
                label: it.label,
                data: it.data,
                fill: false,
                lineTension: 0,
                borderWidth: 1,
                borderColor: statusColors[it.id],
                backgroundColor: statusColors[it.id],
                pointBorderColor: statusColors[it.id],
                pointBackgroundColor: statusColors[it.id]
            };
        });

        if (!datasets.length || minValue < 1) {
            minValue = 0;
        } else {
            minValue--;
        }

        let config = {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: datasets
            },
            options: {
                legend: { display: true, labels: { fontColor: 'black' } },
                responsive: true,
                maintainAspectRatio: false,
                spanGaps: false,
                tooltips: { mode: 'index', intersect: false },
                hover: { mode: 'nearest', intersect: true },
                scales: {
                    // xAxes: [{
                    //     // stacked: true,
                    //     barPercentage: 0.5,
                    //     // barThickness : 73
                    // }],
                    yAxes: [{
                        // stacked: true
                        ticks: { min: minValue }
                    }]
                }
            },
            minValue: minValue
        };

        return config;
    }
}
