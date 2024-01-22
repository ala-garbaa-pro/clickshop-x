// create.component.ts

import { Component, ViewEncapsulation } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { userPayloadCreateType } from '../c-u-user-form/c-u-user-form.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AdminUsersCreateComponent {

  constructor(private userService: UsersService, private router: Router) { }

  goback() {
    this.router.navigate(['/dashboard/admin/users']);
  }

  submitFormCreateUser(userPayload: userPayloadCreateType, next: () => void): void {
    this.userService.createUser(userPayload).subscribe({
      next,
      error: err => {
        alert(err.message);
      }
    });
  }
}

