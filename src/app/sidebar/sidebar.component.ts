import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService]
})

export class SidebarComponent implements OnInit {

  selectFile:any;
  required = false;
  hasError = false;
  error = 'The input has an error!';

  constructor(private sidebarService: SidebarService) {
    // console.log(this.selectFile);
   }

  ngOnInit() {
  }

}
