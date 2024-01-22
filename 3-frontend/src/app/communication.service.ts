// communication.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();

  openSidebar() {
    this.sidebarState.next(true);
  }

  closeSidebar() {
    this.sidebarState.next(false);
  }
}
