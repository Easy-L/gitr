import {Headers, RequestOptions} from "@angular/http";

export class Constant {

  public static jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.access_token});
      return new RequestOptions({headers: headers});
    }
  }

}
