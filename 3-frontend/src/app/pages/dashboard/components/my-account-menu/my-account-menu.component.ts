import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account-menu',
  templateUrl: './my-account-menu.component.html'
})
export class MyAccountMenuComponent {
  @Input() isOpen = false;

  constructor(private authService: AuthService) { }


  toggleMenuState() {
    this.isOpen = !this.isOpen
  }

  closeMenu() {
    this.isOpen = false;
  }


  logout() {
    this.authService.logout();
  }
}
