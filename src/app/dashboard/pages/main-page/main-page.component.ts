import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { Component, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

import { series } from '../../core/data/data';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-main-page',
  imports: [NgApexchartsModule, CommonModule, CalendarModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public dateValue: Object = new Date();

  public chartOptions: Partial<ChartOptions> = {};

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Número de tareas',
          data: series.monthDataSeries1.prices,
        },
      ],
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        foreColor: '#00000',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },

      title: {
        text: 'Resumen de tareas del proyecto',
        align: 'left',
      },
      subtitle: {
        text: 'Proyecto1',
        align: 'left',
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: 'left',
      },
    };
  }
}
