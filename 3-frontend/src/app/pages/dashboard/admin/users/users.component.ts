import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';
import { PageResponse } from 'src/app/model/page.response.model';
import { Role } from 'src/app/model/role.model';
import { RestPageResponse } from 'src/app/model/page.users.response.model';
import { Router } from '@angular/router';
import { UserRoleEnum } from 'src/app/constants/roles.enum';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
})
export class AdminUsersComponent implements OnInit {
  keyword = '';
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;


  pageUsers$!: Observable<RestPageResponse<User>>;
  users: User[] = []; // Create a local array to hold the user data

  pageRoles$!: Observable<PageResponse<Role>>;

  user = { email: '', password: '' };
  selectedRoles: { [roleName: string]: boolean } = {};

  submitted: boolean = false;


  constructor(private userService: UsersService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  openCreateUserPage() {
    this.router.navigate(['/dashboard/admin/users/create']);
  }

  canDoActions(userRole: string[], userId: number) {

    const currentUserId: number | null = this.authService.getMetaDataFromLocalStorage("userId");

    if (currentUserId === 1) return true;


    const theModifiedUserIsSuperAdmin = userRole.toString().includes(UserRoleEnum.SUPER_ADMIN_ROLE);

    if (!theModifiedUserIsSuperAdmin) return true


    if (currentUserId && currentUserId === userId && theModifiedUserIsSuperAdmin) {
      return true
    } else {
      return false
    }
  }

  amIAdminAndAmICurrent(userRole: string[], userId: number) {


    const theModifiedUserIsSuperAdmin = userRole.toString().includes(UserRoleEnum.SUPER_ADMIN_ROLE);


    const currentUserId: number | null = this.authService.getMetaDataFromLocalStorage("userId");



    return currentUserId && currentUserId === userId && theModifiedUserIsSuperAdmin
  }

  loadUsers(): void {

    this.pageUsers$ = this.userService.getUsers(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => new Error(err.message));
      })
    );

    this.pageUsers$.subscribe(pageData => {
      this.users = (pageData['users'] as User[]);
    });

    this.pageRoles$ = this.userService.getRoles(this.keyword, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => new Error(err.message));
      })
    );

  }

  submitForm() {
    this.submitted = true;

    console.log('Email:', this.user.email);
    console.log('Password:', this.user.password);
    console.log('Selected Roles:', this.selectedRoles);
    // Here, you can perform any further actions, such as sending data to a server

    const selectedRoleNames = Object.keys(this.selectedRoles).filter(roleName => this.selectedRoles[roleName]);
    const rolesArray = selectedRoleNames.map(roleName => roleName);

    const userPayload = {
      email: this.user.email,
      password: this.user.password,
      roles: rolesArray
    };

    // this.userService.createUser(userPayload).subscribe({
    //   next: () => {
    //     alert('Success Saving User');
    //     this.user = { email: '', password: '' };
    //     this.selectedRoles = {};
    //     this.submitted = false;
    //   },
    //   error: err => {
    //     alert(err.message);
    //   }
    // });
  }


  // Function to handle pagination
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  updateUser(userId: number) {
    this.router.navigate([`/dashboard/admin/users/update/${userId}`]);
  }
}
