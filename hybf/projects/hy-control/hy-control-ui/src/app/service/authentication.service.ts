import { Injectable } from "@angular/core";
import { CustomHttp } from "../common/custom.http";
import { Router } from "@angular/router";
import { Response, URLSearchParams } from "@angular/http";

export const URL: string = "/api/login";
@Injectable()
export class AuthenticationService {

  constructor(private http: CustomHttp,
    private router: Router) {
  }

  login(username: string, password: string) {
    let params = new URLSearchParams();
    params.set("username", username);
    params.set("password", password);
    localStorage.setItem('currentUser', 'currentUser');
    this.router.navigate(["/"]);
    // return this.http.post(URL, params).subscribe((response: Response) => {
    //   let user = response.json();
    //   if (user && user.access_token) {
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //   }
    //   this.router.navigate(["/"]);
    // });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(["/login"]);
  }

}
