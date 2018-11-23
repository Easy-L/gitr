import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Params} from "../common/params";
import {CustomHttp} from "../common/custom.http";
import {Response,URLSearchParams} from "@angular/http";
import {Modifytableinfoexception} from "../domain/modifytableinfoexception";


export const URL: string = "/api/control/modifytableinfoexception";

@Injectable()
export class ModifytableinfoexceptionService {

  constructor(private http: CustomHttp) {
  }

  list(modifytableinfoexception: Modifytableinfoexception): Observable<Response> {
    return this.http.post(`${URL}/list`, modifytableinfoexception);
  }

}
