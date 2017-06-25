import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { ListboxModule } from 'primeng/primeng';
import { NglModule } from 'ng-lightning/ng-lightning';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { TabularComponent } from './table/tabular/tabular.component';
import { ChartComponent } from './chart/chart.component';
import { SidebarImportComponent } from './sidebar.import/sidebar.import.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StepsComponent } from './steps/steps.component';
import { RdfComponent } from './table/rdf/rdf.component';

import { SharedService } from './shared.service';

import 'hammerjs';
import { VisualizationComponent } from './visualization/visualization.component';
import { SidebarVisualizationComponent } from './sidebar.visualization/sidebar.visualization.component';

@NgModule({
  declarations: [
    AppComponent,
    TabularComponent,
    SidebarImportComponent,
    ChartComponent,
    SidebarComponent,
    StepsComponent,
    RdfComponent,
    VisualizationComponent,
    SidebarVisualizationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    ListboxModule,
    MdGridListModule,
    NgxChartsModule,
    MaterialModule.forRoot(),
    NglModule.forRoot(),
    ClarityModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
