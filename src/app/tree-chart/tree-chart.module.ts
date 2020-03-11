import { NgModule } from '@angular/core';
import { TreeChartComponent } from './tree-chart.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [BrowserModule],
    declarations: [TreeChartComponent],
    exports: [TreeChartComponent]
})
export class TreeChartModule { }
