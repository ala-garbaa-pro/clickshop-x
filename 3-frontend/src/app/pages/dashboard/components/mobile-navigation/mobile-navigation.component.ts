import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html'
})
export class MobileNavigationComponent implements OnInit, OnDestroy {
  displaySidebar: boolean = false;
  sidebarSubscription: Subscription | null = null; // Initialize with null

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.sidebarSubscription = this.communicationService.sidebarState$.subscribe(state => {
      this.displaySidebar = state;
    });
  }

  closeSidebar() {
    this.communicationService.closeSidebar();
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }
}
