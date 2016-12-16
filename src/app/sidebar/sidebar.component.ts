import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService]
})

export class SidebarComponent {

  constructor() { }

  required = false;

  hasError = false;
  error = 'The input has an error!';

}
