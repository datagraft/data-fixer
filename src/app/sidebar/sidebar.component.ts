import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService]
})

export class SidebarComponent {

  data:any;
  selectFile:any;
  required = false;
  hasError = false;
  error = 'The input has an error!';

  constructor(private sidebarService: SidebarService) {
    this.data = this.sidebarService.getFile('Stocks');
   }

  change() {
    console.log(this.selectFile);
    console.log(this.data);
  }

}
