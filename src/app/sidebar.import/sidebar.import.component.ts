import { Component } from '@angular/core';
import { SidebarImportService } from './sidebar.import.service';

@Component({
  selector: 'sidebarImport',
  templateUrl: './sidebar.import.component.html',
  styleUrls: ['./sidebar.import.component.css'],
  providers: [SidebarImportService]
})

export class SidebarImportComponent {

  data:any;
  selectFile:any;
  required = false;
  hasError = false;
  error = 'The input has an error!';

  constructor(private sidebarImportService: SidebarImportService) { }

  getDataFromFile () {
    this.data = this.sidebarImportService.getFile(this.selectFile);
  }

}
