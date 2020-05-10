import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "@models/User";
import { environment } from "environments/environment";
import { map } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private router: Router, private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")));
    this.user$ = this.userSubject.asObservable();
  }

  // User data
  private userSubject: BehaviorSubject<User>;
  user$: Observable<User>;

  get userValue(): User {
    return this.userSubject.value;
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.user$.pipe(map(user => user !== null && user !== undefined));
  }

  // Public methods

  login(email: string, password: string) {
    return this.httpClient
      .post<any>(`${environment.authApiUrl}/login`, { email, password })
      .pipe(
        map(userData => {
          // Save user details in localStorage
          this.saveUserData(userData.accessToken);
        })
      );
  }

  signup(email: string, password: string) {
    return this.httpClient
      .post<any>(`${environment.authApiUrl}/signup`, { email, password })
      .pipe(
        map(userData => {
          // Save user details in localStorage
          this.saveUserData(userData.accessToken);
        })
      );
  }

  logout() {
    // Remove the user from local storage
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate([""]);
  }

  // Private methods
  private saveUserData(token: string): void {
    const user: User = jwt_decode(token);
    user.token = token;

    localStorage.setItem("user", JSON.stringify(user));
    this.userSubject.next(user);
  }
}
