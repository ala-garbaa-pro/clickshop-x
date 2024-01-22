import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth.guard.service';
import { UserRoleEnum } from './constants/roles.enum';
import { AdminIndexComponent } from './pages/dashboard/admin/index.component';
import { AdminUsersComponent } from './pages/dashboard/admin/users/users.component';
import { AdminUsersCreateComponent } from './pages/dashboard/admin/users/create/create.component';
import { AdminUsersUpdateComponent } from './pages/dashboard/admin/users/update/update.component';
import { Only1stAuthGuardService } from './services/only-1st-admin-auth.guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/admin/users/update/:userId', component: AdminUsersUpdateComponent, canActivate: [Only1stAuthGuardService], data: { role: UserRoleEnum.SUPER_ADMIN_ROLE } },
  { path: 'dashboard/admin/users/create', component: AdminUsersCreateComponent, canActivate: [AuthGuardService], data: { role: UserRoleEnum.SUPER_ADMIN_ROLE } },
  { path: 'dashboard/admin/users', component: AdminUsersComponent, canActivate: [AuthGuardService], data: { role: UserRoleEnum.SUPER_ADMIN_ROLE } },
  { path: 'dashboard/admin', component: AdminIndexComponent, canActivate: [AuthGuardService], data: { role: UserRoleEnum.SUPER_ADMIN_ROLE } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
