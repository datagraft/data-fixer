import { Component } from '@angular/core';
import { SidebarImportService } from './sidebar.import.service';

@Component({
  selector: 'sidebarImport',
  templateUrl: './sidebar.import.component.html',
  styleUrls: ['./sidebar.import.component.css'],
  providers: [SidebarImportService]
})

export class SidebarImportComponent {

  selectFile:any;
  required = false;
  hasError = false;
  error = 'The input has an error!';

  constructor(private sidebarImportService: SidebarImportService) { }

  getDataFromFile () {
    this.sidebarImportService.getDataParsed(this.selectFile);
  }

  getData () {
    return this.sidebarImportService.data;
  }

}
