// navbar.component.ts

import { Component } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private communicationService: CommunicationService) { }

  openSidebar() {
    console.log("openSidebar");

    this.communicationService.openSidebar();
  }

}
