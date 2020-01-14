import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'ngx-tree-chart',
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.scss']
})
export class TreeChartComponent implements OnInit, AfterViewChecked {
  @ViewChild('treeChart', { static: false }) treeChart: ElementRef;

  @Input() keyExpr: string = 'id';
  @Input() displayExpr: string = 'name';
  @Input() parentIdExpr: string = 'parentId';
  @Input() childsExpr: string = 'childs';

  @Input() dataStructure: 'tree' | 'plain' = 'plain';
  @Input() dataSource: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    console.log(this.treeChart);
  }

}
