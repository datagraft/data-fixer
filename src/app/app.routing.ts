import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import {DetailModeComponent} from "./table/annotation/detailMode.component";
import {AnnotationForm} from "./table/annotation/annotation.component";
import {AppComponent} from "./app.component"; //import about component

export const appRoutes: Routes = [
  { path: 'home', component: AnnotationForm},
  { path: 'detail', component: DetailModeComponent },
  { path: '', component: AppComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
