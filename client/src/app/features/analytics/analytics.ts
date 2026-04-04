import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AnalyticsService } from '../../core/services/analytics.service';
import { AnalyticsOverview } from '../../core/models/analytics.model';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss'
})
export class AnalyticsComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  private cdr = inject(ChangeDetectorRef);

  overview: AnalyticsOverview | null = null;
  loading = true;
  error = '';

  // Asset Status Donut
  assetStatusChart: any = {};

  // Incidents by Severity Bar
  incidentsSeverityChart: any = {};

  // Work Orders by Priority Bar
  workOrdersPriorityChart: any = {};

  // Inspections by Status Bar
  inspectionsStatusChart: any = {};

  // Assets per Site Bar
  assetsPerSiteChart: any = {};

  // Incidents per Site Bar
  incidentsPerSiteChart: any = {};

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.analyticsService.getOverview().subscribe({
      next: (data) => {
        this.overview = data;
        this.buildCharts(data);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load analytics data.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  buildCharts(data: AnalyticsOverview): void {
    const chartDefaults = {
      background: 'transparent',
      foreColor: '#8892a4'
    };

    // Asset Status Donut
    this.assetStatusChart = {
      series: data.assetStatus.map(a => a.count),
      chart: { type: 'donut', height: 300, ...chartDefaults },
      labels: data.assetStatus.map(a => a.status),
      colors: ['#34d399', '#fbbf24', '#f87171'],
      legend: { position: 'bottom', labels: { colors: '#8892a4' } },
      dataLabels: { enabled: true },
      plotOptions: {
        pie: { donut: { size: '65%' } }
      }
    };

    // Incidents by Severity
    this.incidentsSeverityChart = {
      series: [{ name: 'Incidents', data: data.incidentsBySeverity.map(i => i.count) }],
      chart: { type: 'bar', height: 300, ...chartDefaults, toolbar: { show: false } },
      xaxis: { categories: data.incidentsBySeverity.map(i => i.severity), labels: { style: { colors: '#8892a4' } } },
      yaxis: { labels: { style: { colors: '#8892a4' } } },
      colors: ['#f87171'],
      grid: { borderColor: '#2e3548' },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '50%' } },
      dataLabels: { enabled: false }
    };

    // Work Orders by Priority
    this.workOrdersPriorityChart = {
      series: [{ name: 'Work Orders', data: data.workOrdersByPriority.map(w => w.count) }],
      chart: { type: 'bar', height: 300, ...chartDefaults, toolbar: { show: false } },
      xaxis: { categories: data.workOrdersByPriority.map(w => w.priority), labels: { style: { colors: '#8892a4' } } },
      yaxis: { labels: { style: { colors: '#8892a4' } } },
      colors: ['#4f8ef7'],
      grid: { borderColor: '#2e3548' },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '50%' } },
      dataLabels: { enabled: false }
    };

    // Inspections by Status
    this.inspectionsStatusChart = {
      series: [{ name: 'Inspections', data: data.inspectionsByStatus.map(i => i.count) }],
      chart: { type: 'bar', height: 300, ...chartDefaults, toolbar: { show: false } },
      xaxis: { categories: data.inspectionsByStatus.map(i => i.status), labels: { style: { colors: '#8892a4' } } },
      yaxis: { labels: { style: { colors: '#8892a4' } } },
      colors: ['#34d399'],
      grid: { borderColor: '#2e3548' },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '50%' } },
      dataLabels: { enabled: false }
    };

    // Assets per Site
    this.assetsPerSiteChart = {
      series: [{ name: 'Assets', data: data.assetsPerSite.map(a => a.count) }],
      chart: { type: 'bar', height: 350, ...chartDefaults, toolbar: { show: false } },
      xaxis: {
        categories: data.assetsPerSite.map(a => a.site),
        labels: { style: { colors: '#8892a4' }, rotate: -30 }
      },
      yaxis: { labels: { style: { colors: '#8892a4' } } },
      colors: ['#fbbf24'],
      grid: { borderColor: '#2e3548' },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '50%' } },
      dataLabels: { enabled: false }
    };

    // Incidents per Site
    this.incidentsPerSiteChart = {
      series: [{ name: 'Incidents', data: data.incidentsPerSite.map(i => i.count) }],
      chart: { type: 'bar', height: 350, ...chartDefaults, toolbar: { show: false } },
      xaxis: {
        categories: data.incidentsPerSite.map(i => i.site),
        labels: { style: { colors: '#8892a4' }, rotate: -30 }
      },
      yaxis: { labels: { style: { colors: '#8892a4' } } },
      colors: ['#f87171'],
      grid: { borderColor: '#2e3548' },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '50%' } },
      dataLabels: { enabled: false }
    };
  }
}