import { Component } from '@angular/core';
import { SidebarImportService } from './sidebar.import.service';

@Component({
  selector: 'sidebarImport',
  templateUrl: './sidebar.import.component.html',
  styleUrls: ['./sidebar.import.component.css'],
  providers: [SidebarImportService]
})

export class SidebarImportComponent {

  private selectFile: any;
  public headers: any;
  public types: any;
  private required = false;
  private hasError = false;
  private error = 'The input has an error!';

  constructor(private sidebarImportService: SidebarImportService) {
  }

  getDataFromFile() {
    this.sidebarImportService.getDataParsed(this.selectFile);
  }

  getData() {
    this.headers = this.sidebarImportService.headers;
    this.types = this.sidebarImportService.types;
    return this.sidebarImportService.data;
  }

}
