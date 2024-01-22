// update.component.ts

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserRoleEnum } from 'src/app/constants/roles.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AdminUsersUpdateComponent implements OnInit {

  userId: number | null = null

  user: User = { name: '', email: '', password: '', roles: [] };


  constructor(private userService: UsersService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    // Extract userId from the route parameters
    this.route.params.subscribe(params => {
      console.log(params);

      if (params['userId'] !== ":userId") {
        this.userId = params['userId'];
        this.fetchUser()

      } else {
        window.history.back();
      }
    });
  }

  amIAdminAndAmICurrent(userRole: string[], userId: number) {

    const theModifiedUserIsSuperAdmin = userRole.toString().includes(UserRoleEnum.SUPER_ADMIN_ROLE);

    const currentUserId: number | null = this.authService.getMetaDataFromLocalStorage("userId");

    return currentUserId && currentUserId === userId && theModifiedUserIsSuperAdmin
  }


  fetchUser() {
    console.log("start fetching user...");


    if (!this.userId) throw new Error("User id is null");



    this.userService.getUser(this.userId).subscribe({
      next: (user) => {
        console.log("user found", user);

        this.user = user
      },
      error: err => {
        alert(err.message);
      }
    });
  }

  goback() {
    this.router.navigate(['/dashboard/admin/users']);
  }

  submitFormUpdateUser(userPayload: any, next: () => void): void {
    console.log("userPayload to update=>", userPayload);


    if (!userPayload.userId) throw new Error("User id is required");

    this.userService.updateUser(userPayload, userPayload.userId).subscribe({
      next,
      error: err => {
        alert(err.message);
      }
    });
  }
}

