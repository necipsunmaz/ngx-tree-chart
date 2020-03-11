import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CardStyle } from '../core/types/cardStyle';
import { svgParse, prepareTree } from '../utils/tools';

@Component({
  selector: 'ngx-tree-chart',
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.scss']
})
export class TreeChartComponent implements OnInit {
  @ViewChild('divElement', { static: false }) divElement: ElementRef;

  private _svg: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  private _matrix: DOMMatrix = this._svg.createSVGMatrix();
  private _dataSource: any[] = [];

  @Input() keyExpr: string = 'id';
  @Input() displayExpr: string = 'name';
  @Input() parentIdExpr: string = 'parentId';
  @Input() childsExpr: string = 'childs';
  @Input() colorExpr: string = 'color';
  @Input() iconExpr: string = 'icon';
  @Input() width: number = 650;
  @Input() height: number = 500;
  @Input() dataStructure: 'tree' | 'plain' = 'plain';
  @Input()
  get dataSource(): any[] { return this._dataSource }
  set dataSource(val: any[]) {
    this.prepareData(val);
  }

  @Input() cardStyle: CardStyle = <CardStyle>{
    width: 300,
    height: 65,
    fill: '#ff0000',
    opacity: 1,
    rx: 4,
    ry: 4
  }

  constructor() { }

  ngOnInit() {
    this._svg.setAttribute('width', this.width.toString());
    this._svg.setAttribute('height', this.height.toString());
    this._svg.setAttribute('viewBox', '0 0 650 500');
    this._svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // this._svg.addEventListener('mousedown', this.mouseDown, false); // mousewheel duplicates dblclick function
    // this._svg.addEventListener('mousemove', this.mouseMove, false); // for Firefox
    // this._svg.addEventListener('mouseup', this.mouseUp, false); // for Firefox

    // this._svg.addEventListener('DOMMouseScroll', this.handleScroll, false);
    // this._svg.addEventListener('mousewheel', this.handleScroll, false);
  }

  prepareData(data: any[]) {
    if (!Array.isArray(data)) {
      throw new Error('Data source is not array!');
    }

    if (this.dataStructure == 'plain') {
      prepareTree(data, null).then(tree => {
        this._dataSource = tree;
        this.draw();
      })
    } else {
      this._dataSource = data;
      this.draw();
    }
  }

  draw() {
    this.divElement.nativeElement.appendChild(this._svg);
    this.createCard();
  }

  createCard() {
    const card = svgParse('g', { transform: 'matrix(1,0,0,1,0,120)' });
    card.appendChild(svgParse('rect', this.cardStyle));
    this._svg.appendChild(card);
  }
}
