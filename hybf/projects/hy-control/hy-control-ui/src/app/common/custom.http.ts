import { Injectable } from "@angular/core";
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/Rx";
import { Constant } from "./constant";
import { NgProgress } from "ngx-progressbar";

@Injectable()
export class CustomHttp extends Http {

  constructor(private router: Router,
    private backend: ConnectionBackend,
    private defaultOptions: RequestOptions,
    private ngProgress: NgProgress) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this.ngProgress.start();
    return super.request(url)
      .catch((error: Response) => {
        this.ngProgress.done();
        if (error.status == 405) {
          this.router.navigate(['/login']);
        }
        return Observable.throw(error);
      }).do(() => {
        this.ngProgress.done();
      });
  }

}
