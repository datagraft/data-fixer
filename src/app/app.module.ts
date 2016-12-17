import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ClarityModule } from 'clarity-angular';
import { NglModule } from 'ng-lightning/ng-lightning';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SidebarImportComponent } from './sidebar.import/sidebar.import.component';

import { SharedService } from './shared.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SidebarImportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule,
    MaterialModule.forRoot(),
    NglModule.forRoot()
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
