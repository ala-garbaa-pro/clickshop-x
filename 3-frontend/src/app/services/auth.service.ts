import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginRequest, LoginResponse } from "../model/login.model";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoggedUser } from "../model/logged-user.model";
import { Router } from "@angular/router";
import { environment } from '../environments/environment.development';
import { UserRoleEnum } from '../constants/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelperService = new JwtHelperService();
  user = new BehaviorSubject<LoggedUser | null>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(user: LoginRequest): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    return this.http.post<LoginResponse>(environment.backendHost + "/login", formData)
  }

  saveToken(jwtTokens: LoginResponse) {
    const decodedAccessToken = this.jwtHelperService.decodeToken(jwtTokens.accessToken);
    // console.log("----decodedAccessToken----", decodedAccessToken);

    const { userId, email } = JSON.parse(decodedAccessToken.sub);
    // console.log({ userId, email });


    const loggedUser = new LoggedUser(userId, email, decodedAccessToken.roles, jwtTokens.accessToken, this.getExpirationDate(decodedAccessToken.exp));
    this.user.next(loggedUser)
    this.autoLogout(this.getExpirationDate(decodedAccessToken.exp).valueOf() - new Date().valueOf())
    localStorage.setItem('userData', JSON.stringify(loggedUser));

    this.redirectLoggedInUser(decodedAccessToken, jwtTokens.accessToken)
  }

  redirectLoggedInUser(decodedToken: any, accessToken: string) {

    if (decodedToken.roles.includes(UserRoleEnum.SUPER_ADMIN_ROLE)) this.router.navigateByUrl("/dashboard/admin");

  }

  autoLogin() {
    const userData: {
      userId: number,
      email: string,
      roles: string[],
      _token: string,
      _expiration: Date,
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) return;

    const loadedUser = new LoggedUser(userData.userId, userData.email, userData.roles, userData._token, new Date(userData._expiration))
    if (loadedUser.token) {

      this.user.next(loadedUser);
      this.autoLogout(loadedUser._expiration.valueOf() - new Date().valueOf());

      this.redirectLoggedInUser(this.jwtHelperService.decodeToken(loadedUser.token), "")
    }
  }

  authenticateUserFromLocalStorage(): boolean {

    const userData: {
      userId: number,
      email: string,
      roles: string[],
      _token: string,
      _expiration: Date,
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) return false;

    const loadedUser = new LoggedUser(userData.userId, userData.email, userData.roles, userData._token, new Date(userData._expiration))

    if (!loadedUser.token) {
      return false
    }

    this.user.next(loadedUser);

    return true
  }

  logout() {
    localStorage.clear();
    this.user.next(null);
    this.router.navigate(['/'])
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  getExpirationDate(exp: number) {
    const date = new Date(0);
    date.setUTCSeconds(exp)
    return date;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }



  getMetaDataFromLocalStorage<T extends keyof LoggedUser>(key: T): LoggedUser[T] | null {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const tmp = JSON.parse(userDataString) as LoggedUser;
      return tmp[key] !== undefined ? tmp[key] : null;
    }

    return null;
  }






}
