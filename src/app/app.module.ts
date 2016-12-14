import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ClarityModule } from 'clarity-angular';
import { NglModule } from 'ng-lightning/ng-lightning';

import { handsontable } from 'ng2-handsontable/components/index';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    handsontable,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule,
    MaterialModule.forRoot(),
    NglModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
