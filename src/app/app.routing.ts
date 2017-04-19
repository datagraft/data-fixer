import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AppComponent} from "./app.component";
import {DetailModeComponent} from "./table/annotation/detailMode.component";
import {HomeComponent} from "./table/annotation/home.component"; //import about component

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'detail', component: DetailModeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
