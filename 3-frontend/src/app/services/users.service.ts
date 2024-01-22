import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../environments/environment.development';
import { User } from '../model/user.model';
import { PageResponse } from '../model/page.response.model';
import { Role } from '../model/role.model';
import { RestPageResponse } from '../model/page.users.response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  public getUsers(currentPage: number, pageSize: number): Observable<RestPageResponse<User>> {
    return this.http.get<RestPageResponse<User>>(environment.backendHost + "/list-users?" + "&page=" + currentPage + "&size=" + pageSize);
  }

  public getRoles(keyword: string, currentPage: number, pageSize: number): Observable<PageResponse<Role>> {
    return this.http.get<PageResponse<Role>>(environment.backendHost + "/roles?keyword=" + keyword + "&page=" + currentPage + "&size=" + pageSize);
  }

  public checkIfEmailExist(email: string): Observable<boolean> {
    return this.http.get<boolean>(environment.backendHost + "/users?email=" + email);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(environment.backendHost + "/create-user", user)
  }

  public updateUser(user: User, userId: number): Observable<User> {
    return this.http.put<User>(environment.backendHost + "/update-user?" + "&userId=" + userId, user)
  }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(environment.backendHost + "/get-user?" + "&userId=" + userId);
  }
}
