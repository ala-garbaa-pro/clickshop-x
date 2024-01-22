import { Component, Input } from '@angular/core';
import { BuildingStorefrontOutlineIconComponent, RocketLaunchOutlineIconComponent, ShieldCheckOutlineIconComponent, UserCircleOutlineIconComponent, UserOutlineIconComponent } from '@dimaslz/ng-heroicons';
import { UserRoleEnum } from 'src/app/constants/roles.enum';

@Component({
  selector: 'app-format-roles',
  template: `
    <ng-container *ngIf="roles.length > 0">
      <div *ngFor="let role of roles" class="inline-flex items-center mb-2 ml-2">
        
        <span [ngClass]="getBadgeClasses(role)">
        <div [appDynamicIcon]="getIconComponent(role)" class=""></div> {{ role | roleFormat  }}
        </span>
      </div>
    </ng-container>
  `,
})
export class FormatRolesComponent {
  @Input() roles: string[] = [];

  commonClasses = "flex whitespace-nowrap text-black/85 select-none "

  getBadgeClasses(role: string): string {
    const badgeColors = {
      [UserRoleEnum.SUPER_ADMIN_ROLE]: this.commonClasses + 'bg-red-500/40',
      [UserRoleEnum.STORE_MANAGER_ROLE]: this.commonClasses + 'bg-green-500/40',
      [UserRoleEnum.CUSTOMER_ROLE]: this.commonClasses + 'bg-indigo-500/40',
    };

    const defaultClasses = 'px-2 py-1 rounded-full';
    const roleClasses = badgeColors[role as UserRoleEnum] || 'bg-gray-500/40';

    return `${defaultClasses} ${roleClasses}`;
  }

  getIconComponent(iconName: string) {
    switch (iconName) {
      case UserRoleEnum.SUPER_ADMIN_ROLE:
        return ShieldCheckOutlineIconComponent

      case UserRoleEnum.STORE_MANAGER_ROLE:
        return BuildingStorefrontOutlineIconComponent

      case UserRoleEnum.CUSTOMER_ROLE:
        return UserOutlineIconComponent

      default:
        return UserCircleOutlineIconComponent;
    }
  }
}
