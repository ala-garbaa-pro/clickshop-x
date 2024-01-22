import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { UserRoleEnum } from '../constants/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class Only1stAuthGuardService implements CanActivate {

  redirect = ""

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this.authService.user.pipe(take(1), map(user => {

      console.log(user);

      const requestedUserPath = route.routeConfig?.path

      if (requestedUserPath) this.redirect = requestedUserPath;


      const isAuth = !!user;

      if (user === null) {
        console.log("## try to authenticate user from localstorage");
        const isAuthFromLocalStorage = this.authService.authenticateUserFromLocalStorage()

        console.log("isAuthFromLocalStorage =>", isAuthFromLocalStorage);

        if (isAuthFromLocalStorage) {
          return this.router.createUrlTree([this.redirect]);

        } else {
          return this.router.createUrlTree([`/login`]);
        }

      }

      console.log('<<< isAuth >>>', isAuth);


      if (!isAuth) {
        console.log("if !isAuth", isAuth);

        return this.router.createUrlTree([`/login`]);
      }

      console.log("isAuth=>", isAuth);
      if (user?.roles.includes(route.data['role'])) {
        console.log("have role =>", route.data['role']);

        return true;
      } else if (user.userId === 1 && user?.roles.includes(UserRoleEnum.SUPER_ADMIN_ROLE)) {

        console.log("includes SUPER_ADMIN_ROLE =>", route.data['role']);

        return this.router.createUrlTree([this.redirect]);

      } else {
        return false
      }


    }))
  }
}
