import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgHeroiconsModule } from "@dimaslz/ng-heroicons";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth.interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { InputComponent } from './components/ui/input/input.component';
import { LogoComponent } from './components/ui/logo/logo.component';
import { AdminIndexComponent } from './pages/dashboard/admin/index.component';
import { DrawerWrapperComponent } from './pages/dashboard/components/drawer-wrapper/drawer-wrapper.component';
import { DrawerComponent } from './pages/dashboard/components/drawer/drawer.component';
import { MobileNavigationComponent } from './pages/dashboard/components/mobile-navigation/mobile-navigation.component';
import { NavbarIconComponent } from './pages/dashboard/components/navbar-icon/navbar-icon.component';
import { NavbarComponent } from './pages/dashboard/components/navbar/navbar.component';
import { SidebarItemMapComponent } from './pages/dashboard/components/sidebar-item-map/sidebar-item-map.component';
import { SidebarItemComponent } from './pages/dashboard/components/sidebar-item/sidebar-item.component';
import { MainDashboardLayoutComponent } from './pages/dashboard/layout/main-dashboard-layout/main-dashboard-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DynamicIconDirective } from './dynamic-icon.directive';
import { AdminUsersComponent } from './pages/dashboard/admin/users/users.component';
import { AdminUsersCreateComponent } from './pages/dashboard/admin/users/create/create.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastService, AngularToastifyModule } from "angular-toastify";
import { CUUserFormComponent } from './pages/dashboard/admin/users/c-u-user-form/c-u-user-form.component';
import { AdminUsersUpdateComponent } from './pages/dashboard/admin/users/update/update.component';
import { FormatRolesComponent } from './pages/dashboard/components/format-roles/format-roles.component';
import { RoleFormatPipe } from './pipes/role-format.pipe';
import { MyAccountMenuComponent } from './pages/dashboard/components/my-account-menu/my-account-menu.component';
import { DarkModeSwitcherComponent } from './components/ui/dark-mode-switcher/dark-mode-switcher.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    LogoComponent,
    LoginFormComponent,
    InputComponent,
    ButtonComponent,
    MainDashboardLayoutComponent,
    NavbarComponent,
    MobileNavigationComponent,
    SidebarItemMapComponent,
    NavbarIconComponent,
    DrawerWrapperComponent,
    DrawerComponent,
    SidebarItemComponent,
    DynamicIconDirective,
    AdminIndexComponent,
    AdminUsersComponent,
    AdminUsersCreateComponent,
    CUUserFormComponent,
    AdminUsersUpdateComponent,
    FormatRolesComponent,
    RoleFormatPipe,
    MyAccountMenuComponent,
    DarkModeSwitcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgHeroiconsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularToastifyModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
    ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
