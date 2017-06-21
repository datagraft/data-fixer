import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';

import { SharedTableService } from '../shared.service';
import { ProfilingService } from './profiling.service';
import { TransformationsService } from './transformations.service';

declare var Handsontable: any;

@Component({
  selector: 'tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService]
})

export class TabularComponent implements OnInit {

  @Input() profileSubset: any;
  @Output() profileSubsetEmitter: EventEmitter<number>;
  @Output() tableSelectedEmitter: EventEmitter<any>;

  // shared table resources
  public data: Array<any>;
  public headers: Array<any>;
  public inferredTypes: Object;
  public settings: any;

  // handsontable instance
  public hot: any;
  // tabular mode/ rdf mode
  public tabularMode: boolean = true;
  public selection: Array<any>;

  // visual profiling properties
  public chartData01: any;
  public chartLabels01: any;
  public chartData02: any;
  public chartLabels02: any;
  public chartData03: any;
  public statsData = [];
  public inferredType: boolean;
  public type: any;
  public selected: any;

  constructor(private chartComponent: ChartComponent, private rdfComponent: RdfComponent, private sharedTableService: SharedTableService, private profilingService: ProfilingService, private transformationsService: TransformationsService) {
    // init table
    let initialize = [];
    for (let i = 0; i <= 18; i++) {
      initialize.push(["-", "-", "-", "-", "-"]);
    }
    this.data = initialize;
    // init profiling object
    this.profileSubset = new Object();
    this.profileSubset.selection = 0;
    this.profileSubset.chart = 0;
    this.inferredType = true;
    this.profileSubsetEmitter = new EventEmitter<number>();
    this.tableSelectedEmitter = new EventEmitter<any>();
  }

  getEmittedRDFdata(value) {
    this.data = value;
    this.hot.render();
  }

  tabMode() {
    this.hot.alter('remove_row', 0);
    this.hot.updateSettings(this.updateSettings(460, this.headers));
    this.hot.render();
  }

  rdfMode() {
    this.rdfComponent.hot = this.hot;
    this.rdfComponent.data = this.data;
    this.rdfComponent.headers = this.headers;
    this.inferredTypes = this.profilingService.inferDataTypes(this.data);
    this.rdfComponent.inferredTypes = this.inferredTypes;
    this.rdfComponent.init();
  }

  updateSettings(height, headers) {
    return {
      height: height,
      colHeaders: headers
    }
  }

  ngOnInit() {
    let container = document.getElementById('tabular');
    this.settings = {
      data: this.data,
      rowHeaders: false,
      colHeaders: true,
      columnSorting: false,
      viewportColumnRenderingOffset: 40,
      contextMenu: {
        callback: (key, options) => {
          if (key === 'row_above' || 'row_below' || 'remove_col' || 'remove_row' || 'col_left' || 'col_right' || 'undo' || 'redo' || 'zero') {
            this.hot.getSelected();
            this.refresh();
          };
          if (key === "zero") {
            this.emptyToZero(15.6);
          };
        },
        items: {
          "row_above": {},
          "row_below": {},
          "remove_col": {},
          "remove_row": {},
          "col_left": {},
          "col_right": {},
          "zero": { name: 'Set empty cells to median' },
          "undo": {},
          "redo": {}
        },
      },
      height: 460,
      stretchH: 'all',
      className: 'htCenter htMiddle',
      afterSelection: (r, c, r2, c2) => {
        let preSelection = this.selection;
        this.selection = this.hot.getSelected();
        if (this.selection != preSelection) {
          this.refresh();
        }
      }
    };
    this.hot = new Handsontable(container, this.settings);
    this.statsData = this.statsDataInit();
  }

  onProfileSubsetEmitted(value: any) {
    this.profileSubset = value;
    this.profileSubsetEmitter.emit(this.profileSubset);
    this.selectCell();
  }

  onTableSelectedEmitted() {
    this.tableSelectedEmitter.emit('Table selection emitted to app component');
  }

  statsDataInit() {
    return [
      { stat: 'Count', value: 0 },
      { stat: 'Distinct', value: 0 },
      { stat: 'Quartile 1', value: 0 },
      { stat: 'Mean', value: 0 },
      { stat: 'Quartile 3', value: 0 },
      { stat: 'Std. deviation', value: 0 },
      { stat: 'Min', value: 0 },
      { stat: 'Max', value: 0 },
    ];
  }

  refresh() {
    this.profilingService.data = this.data;
    this.selected = this.hot.getSelected();
    this.profilingService.columnSelected = this.selected[1];
    this.refreshChartData();
  }

  refreshChartData() {
    this.profilingService.getProfile();
    this.hot.render();
    setTimeout(() => {
      this.chartData01 = this.profilingService.profile[2];
      this.chartLabels01 = this.profilingService.profile[3];
      this.chartData02 = this.profilingService.profile[3];
      this.chartLabels02 = this.profilingService.profile[5];
      this.type = this.profilingService.typeInferred;
      if (this.profilingService.typeInferred == "string" || this.profilingService.typeInferred == "date" || this.profilingService.stdev == 0) {
        this.inferredType = false;
      }
      else {
        this.inferredType = true;
        this.chartComponent.chartData03 = this.profilingService.columnData;
        this.chartComponent.refreshPlotly();
      }
      this.onTableSelectedEmitted();
      this.refreshStats();
    },
      300);
  };

  refreshStats() {
    this.statsData = this.statsDataInit();
    setTimeout(() => {
      this.statsData = this.profilingService.statData;
    },
      10);
  }

  headersUpdate(headers) {
    this.hot.updateSettings({
      colHeaders: headers
    });
    this.data.shift();
    this.hot.render();
  }

  replaceChar() {
    this.transformationsService.replaceChar(this.data, this.selected[1]);
    this.refreshChartData();
  }

  emptyToZero(param_1) {
    this.transformationsService.emptyToZero(this.data, this.selected[1], param_1);
    this.refreshChartData();
  }

  upperCase() {
    this.transformationsService.upperCase(this.data, this.selected[1]);
    this.refreshChartData();
  }

  pad(param_1, param_2) {
    this.transformationsService.pad(this.data, this.selected[1], param_1, param_2);
    this.refreshChartData();
  }

  convertToStandardFormat() {
    this.transformationsService.convertToStandardFormat(this.data, this.selected[1]);
    this.refreshChartData();
  }

  reformatDates() {
    this.transformationsService.reformatDates(this.data, this.selected[1]);
    this.refreshChartData();
  }

  concatenateCadRef() {
    let columns01: any = [11, 12, 13, 14, 15];
    let separation: string = "/";
    this.transformationsService.concatenateCadRef(this.data, columns01, separation);
    this.refreshChartData();
    this.headers.push("cad-ref");
    this.headersUpdate(this.headers);
  }

  concatenateCadRefId() {
    let columns01: any = [11, 12, 13, 14, 15];
    this.transformationsService.concatenateCadRefId(this.data, columns01);
    this.refreshChartData();
    this.headers.push("cad-ref-id");
    this.headersUpdate(this.headers);
  }

  concatenateRrId() {
    let columns02: any = [11, 12, 13, 14, 15];
    this.transformationsService.concatenateCadRefId(this.data, columns02);
    this.refreshChartData();
    this.headers.push("cad-ref-id");
    this.headersUpdate(this.headers);
  }

  concatenateRrIdB() {
    let columns03: any = [11, 12, 13, 14, 15];
    this.transformationsService.concatenateCadRefId(this.data, columns03);
    this.refreshChartData();
    this.headers.push("cad-ref-id");
    this.headersUpdate(this.headers);
  }

  removeCol() {
    for (var i = 0; i < this.data.length; i++) {
      this.data[i].shift();
    }
    this.headers.shift();
    this.refresh();
  }

  selectChartLabels(chartID) {
    let chartLabels: any;
    if (chartID == 1) {
      chartLabels = this.chartLabels01;
    }
    else if (chartID == 2) {
      chartLabels = this.chartLabels02;
    }
    return chartLabels;
  }

  selectCell() {
    let rowStartEnd = this.profilingService.getRowStartEnd(this.data, this.profileSubset.chart, this.profileSubset.selection, this.selectChartLabels(this.profileSubset.chart));
    this.hot.selectCell(rowStartEnd[0], this.selected[1], rowStartEnd[1], this.selected[1]);
  }
}

