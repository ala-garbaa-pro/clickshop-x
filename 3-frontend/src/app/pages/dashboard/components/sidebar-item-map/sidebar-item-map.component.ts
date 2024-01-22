import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-item-map',
  template: `
    <ng-container *ngFor="let link of adminLinks; let isFirst = first">
      <app-sidebar-item
        [href]="link.href"
        [label]="t(link.label)"
        [icon]="link.icon"
        [ngClass]="{'mt-5 flex': !isFirst}"
      ></app-sidebar-item>
    </ng-container>
  `,
})
export class SidebarItemMapComponent implements OnInit {
  adminLinks: { href: string; label: string; icon: string }[] = [
    { href: '/dashboard/admin', label: 'Dashboard', icon: 'dashboard' },
    { href: '/dashboard/admin/users', label: 'Users', icon: 'users' },
    { href: '/dashboard/admin/settings', label: 'Settings', icon: 'settings' },
    { href: '/dashboard/admin/customers', label: 'Customers', icon: 'customers' },
    { href: '/dashboard/admin/orders', label: 'Orders', icon: 'orders' },
    { href: '/dashboard/admin/products', label: 'Products', icon: 'products' },
    { href: '/dashboard/admin/categories', label: 'Categories', icon: 'categories' },
    { href: '/dashboard/admin/roles', label: 'Roles', icon: 'roles' },
    { href: '/dashboard/admin/states', label: 'States', icon: 'states' },
  ];
  

  ngOnInit(): void { }

  // Replace this function with your translation logic
  t(label: string): string {
    // Implement your translation logic here
    return label;
  }
}
