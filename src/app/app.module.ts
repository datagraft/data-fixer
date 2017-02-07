import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {ListboxModule} from 'primeng/primeng';
import {NglModule} from 'ng-lightning/ng-lightning';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {ChartComponent} from './chart/chart.component';
import {SidebarImportComponent} from './sidebar.import/sidebar.import.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {StepsComponent} from './steps/steps.component';

import {SharedService} from './shared.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SidebarImportComponent,
    ChartComponent,
    SidebarComponent,
    StepsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    ListboxModule,
    NgxChartsModule,
    MaterialModule.forRoot(),
    NglModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
