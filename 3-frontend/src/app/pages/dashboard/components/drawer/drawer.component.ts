import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drawer',
  template: `
    <ng-container *ngIf="open">
      <aside
        #drawerRef
        (click)="onClose()"
        [ngClass]="{
          'fixed inset-0 z-50 h-full overflow-hidden': true,
          'rtl': isRtl(),
        }"
        *ngIf="open"
      >
        <div class="absolute inset-0 bg-dark bg-opacity-40" (click)="onClose()"></div>
        <div
          [ngClass]="{
            'absolute inset-y-0 flex max-w-full outline-none': true,
            'ltr:right-0 rtl:left-auto': variant === 'right',
            'ltr:left-0 rtl:right-auto': variant !== 'right',
          }"
        >
          <div class="h-full w-screen max-w-md bg-light text-body shadow-xl">
            <ng-content></ng-content>
          </div>
        </div>
      </aside>
    </ng-container>
  `,
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() open: boolean = false;
  @Input() variant: 'left' | 'right' = 'right';
  sidebarSubscription: Subscription | null = null; // Initialize with null


  constructor(private elementRef: ElementRef, private router: Router, private communicationService: CommunicationService) { }

  ngOnInit() {
    this.sidebarSubscription = this.communicationService.sidebarState$.subscribe(state => {
      this.open = state;
    });


    if (this.open) {
      disableBodyScroll(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy() {
    clearAllBodyScrollLocks();

    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  isRtl(): boolean {
    const locale = this.router.url.split('/')[1];
    return locale === 'ar' || locale === 'he';
  }

  onClose() {
    this.communicationService.closeSidebar();
    this.open = false;
    enableBodyScroll(this.elementRef.nativeElement);
  }
}
