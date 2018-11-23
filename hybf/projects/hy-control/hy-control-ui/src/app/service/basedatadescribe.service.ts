import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Params} from "../common/params";
import {CustomHttp} from "../common/custom.http";
import {Response,URLSearchParams} from "@angular/http";
import {Basedatadescribe} from "../domain/basedatadescribe";
import { Basedatainfo } from '../domain/basedatainfo';


export const URL: string = "/api/control/basedatadescribe";

export const INFO_URL: string = "/api/control/basedatainfo";

@Injectable()
export class BasedatadescribeService {

  constructor(private http: CustomHttp) {
  }

  list(params: Params): Observable<Response> {
    return this.http.post(`${URL}/list`, params);
  }

  post(basedatadescribe: Basedatadescribe): Observable<Response> {
    let params = new URLSearchParams();
    for (let prop in basedatadescribe) {
      params.set(prop, basedatadescribe[prop]);
    }

    return this.http.post(`${URL}/${basedatadescribe}`, params);
  }

  get(basedatascribe:Basedatadescribe):Observable<Response>{

    return this.http.get(`${URL}/${basedatascribe.id}`);
  }

  put(basedatadescribe: Basedatadescribe): Observable<Response> {
    // let params = new URLSearchParams();
    // for (let prop in basedatadescribe) {
    //   let value =basedatadescribe[prop];
    //   // console.log(value instanceof Array)
    //   // if(  value instanceof Array){
    //   //     for(let inProp in value[0]){
    //   //       params.set(prop+"[0]."+inProp, value[inProp]);
    //   //     }
    //   // }else{
    //     params.set(prop, value);
    //   // }
    // }
    return this.http.put(`${URL}`, basedatadescribe);
  }






  delete(id: string): Observable<Response> {
    return this.http.delete(`${URL}/${id}`);
  }

  deleteItem(id: string): Observable<Response> {
    return this.http.delete(`${INFO_URL}/${id}`);
  }
}
