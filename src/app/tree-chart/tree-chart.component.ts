import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CardStyle } from '../core/types/cardStyle';
import { svgParse } from '../utils/tools';

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
  private _flatSource: any[] = [];

  private _maxDeepLevelCount: number = 0;
  private _maxDeepValue: number = 0;

  @Input() keyExpr: string = 'id';
  @Input() displayExpr: string = 'name';
  @Input() parentIdExpr: string = 'parentId';
  @Input() childsExpr: string = 'childs';
  @Input() colorExpr: string = 'color';
  @Input() iconExpr: string = 'icon';
  @Input() width: number = 1500;
  @Input() height: number = 1200;
  @Input() dataStructure: 'tree' | 'plain' = 'plain';
  @Input()
  get dataSource(): any[] { return this._dataSource }
  set dataSource(val: any[]) {
    this.prepareData(val);
  }

  @Input() cardStyle: CardStyle = <CardStyle>{
    width: 300,
    height: 65,
    gap: 50,
    fill: '#ff0000',
    opacity: 1,
    rx: 4,
    ry: 4
  }

  constructor() { }

  ngOnInit() {
    this._svg.setAttribute('width', this.width.toString());
    this._svg.setAttribute('height', this.height.toString());
    this._svg.setAttribute('viewBox', '0 0 3000 900');
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

    this._maxDeepLevelCount = 0;
    this._maxDeepValue = 0;
    if (this.dataStructure == 'plain') {
      const prepareTree = async (array: any[], parentId: number, deepLevel: number) => {
        const newChilds = [];
        const deep = deepLevel + 1;

        const childs = array.filter(a => a[this.parentIdExpr] == parentId);

        if (childs.length && deep > this._maxDeepValue) {
          this._maxDeepValue = deep;
        }

        childs.forEach(item => {
          prepareTree(array, item[this.keyExpr], deep).then(child => {
            item.deepLevel = deep;
            item[this.childsExpr] = child;
            newChilds.push(item);
          })
        });

        await Promise.all(newChilds);
        return newChilds;
      }

      prepareTree(data, null, 0).then(tree => {
        this._maxDeepLevelCount = data.sort((a, b) => b.childs.length - a.childs.length)[0].childs.length;
        this._flatSource = data;
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

    const maxWidth = this._maxDeepLevelCount * (this.cardStyle.width + this.cardStyle.gap);
    for (let i = 1; i <= this._maxDeepValue; i++) {
      const nodes = this._flatSource.filter(a => a.deepLevel == i);
      if (nodes.length == 1) {
        this.createCard(
          nodes[0][this.keyExpr],
          nodes[0].deepLevel,
          (Math.round(this._maxDeepLevelCount / 2) - 1) * (this.cardStyle.width + this.cardStyle.gap),
          (i * (this.cardStyle.height + this.cardStyle.gap))
        )
      } else {
        nodes.forEach((node, index) => {
          this.createCard(
            node[this.keyExpr],
            node.deepLevel,
            index * (maxWidth / nodes.length),
            (i * (this.cardStyle.height + this.cardStyle.gap))
          )
        })
      }
    }
  }

  createCard(id: number, deepLevel, x: number, y: number) {
    const card = svgParse('g', { nodeid: id, deepLevel: deepLevel, transform: `translate(${x} ${y})` });
    card.appendChild(svgParse('rect', this.cardStyle));
    this._svg.appendChild(card);
  }
}
