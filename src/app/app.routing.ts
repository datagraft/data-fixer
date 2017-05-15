import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule, Params} from '@angular/router';

import {DetailModeComponent} from "./table/annotation/detailMode.component";
import {HomeComponent} from "./table/annotation/home.component";
import {AnnotationForm} from "./table/annotation/annotation.component";
import {AppComponent} from "./app.component"; //import about component

export const appRoutes: Routes = [
  { path: 'home', component: AnnotationForm},
  { path: 'detail/:colId', component: DetailModeComponent },
  { path: '*', component: AppComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
