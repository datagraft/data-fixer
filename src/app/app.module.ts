import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
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
import {AnnotationForm} from './table/annotation/annotation.component';
import {DetailModeComponent} from './table/annotation/detailMode.component';

import { SharedService } from './shared.service';
import { CommonModule } from '@angular/common';

import 'hammerjs';
import {routing} from "./app.routing";
import {HomeComponent} from "./table/annotation/home.component";
import {AnnotationService} from "./table/annotation/annotation.service";

@NgModule({
  declarations: [
    AppComponent,
    TabularComponent,
    SidebarImportComponent,
    ChartComponent,
    SidebarComponent,
    StepsComponent,
    RdfComponent,
    AnnotationForm,
    DetailModeComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    ListboxModule,
    NgxChartsModule,
    MaterialModule.forRoot(),
    NglModule.forRoot(),
    ClarityModule.forRoot(),
    FlexLayoutModule.forRoot(),
    routing
  ],
  providers: [SharedService, AnnotationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
