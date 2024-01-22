import { Component, Input } from '@angular/core';
import { AdjustmentsHorizontalOutlineIconComponent, Cog6ToothOutlineIconComponent, CubeOutlineIconComponent, FolderOutlineIconComponent, IdentificationOutlineIconComponent, RocketLaunchOutlineIconComponent, ShoppingCartOutlineIconComponent, Square2StackOutlineIconComponent, UserOutlineIconComponent, UsersOutlineIconComponent } from '@dimaslz/ng-heroicons';

@Component({
  selector: 'app-sidebar-item',
  template: `
    <a
      [href]="href"
      class="text-start flex w-full items-center text-base text-body-dark focus:text-accent"
    >
      <ng-container *ngIf="icon">
        <div [appDynamicIcon]="getIconComponent(icon)" class="me-4"></div>
      </ng-container>
      <span (click)="closeSidebar()">{{ label }}</span>
    </a>
  `,
})
export class SidebarItemComponent {
  @Input() href: string = '';
  @Input() label: string = '';
  @Input() icon: string = '';

  getIconComponent(iconName: string) {
    switch (iconName) {
      
      case 'dashboard':
        return RocketLaunchOutlineIconComponent;

      case 'settings':
        return Cog6ToothOutlineIconComponent;

      case 'customers':
        return UsersOutlineIconComponent

      case 'orders':
        return ShoppingCartOutlineIconComponent

      case 'products':
        return CubeOutlineIconComponent

      case 'categories':
        return FolderOutlineIconComponent

      case 'roles':
        return IdentificationOutlineIconComponent

      case 'states':
        return Square2StackOutlineIconComponent

      case 'users':
        return UserOutlineIconComponent

      // Add more cases for other icons
      default:
        return null;
    }
  }

  closeSidebar() {
    // Implement the closeSidebar logic here
  }
}
