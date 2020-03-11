import { Component } from '@angular/core';

@Component({
  selector: 'ngx-tree-chart-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  treeChartDataSource = [
    { id: 1, parentId: null, name: 'General Manager' },
    { id: 2, parentId: 1, name: 'Sales Department' },
    { id: 3, parentId: 1, name: 'R&D Department' },
    { id: 4, parentId: 1, name: 'Production & Supply Dept.' },
    { id: 5, parentId: 1, name: 'Financial Department' },
    { id: 6, parentId: 1, name: 'H&R Department' },
    { id: 7, parentId: 4, name: 'QC Department' },
    { id: 8, parentId: 4, name: 'Equipment Department' },
    { id: 9, parentId: 4, name: 'MFG Department' },
    { id: 10, parentId: 4, name: 'Purchase Department' },
    { id: 11, parentId: 4, name: 'Planning Department' },
    { id: 12, parentId: 7, name: 'Laboratory' },
    { id: 13, parentId: 9, name: 'Packaging Department' },
    { id: 14, parentId: 9, name: 'Production Department' },
    { id: 15, parentId: 11, name: 'Warehouse Department' }
  ]
}
