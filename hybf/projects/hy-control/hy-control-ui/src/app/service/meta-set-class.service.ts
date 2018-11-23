import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CustomHttp} from "../common/custom.http";
import {Response} from "@angular/http";
import {MetaSetClass} from "../domain/MetaSetClass";
import {MetaSetDescribe} from "../domain/meta-set-describe";
export const URL: string = "/api/control";

@Injectable()
export class MetaSetClassService {

  constructor(private http: CustomHttp) {
  }

  getRoot(): Observable<Response> {
    return this.http.get(`${URL}/metaSetClass/root`);
  }

  getChildrens(id:string): Observable<Response> {
    return this.http.get(`${URL}/metaSetClass/${id}/childrens`);
  }

  getMetaSetDescribes(id:string): Observable<Response> {
    return this.http.get(`${URL}/metaSetClass/${id}/metaSetDescribes`);
  }

  getMetaSetClass(id:string) {
    return this.http.get(`${URL}/metaSetClass/${id}`);
  }

  postMetaSetClass(metaSetClass:MetaSetClass ) {
    return this.http.post(`${URL}/metaSetClass`,metaSetClass);
  }

  deleteMetaSetClass(id:string) {
    return this.http.delete(`${URL}/metaSetClass/${id}`);
  }

  postMetaSetDescribes(metasetdescribes:MetaSetDescribe[] ) {
    return this.http.post(`${URL}/metaSetDescribes`,metasetdescribes);
  }

  deleteMetaSetDescribes(metasetdescribes:MetaSetDescribe[] ) {
    return this.http.post(`${URL}/deletemetaSetDescribes`,metasetdescribes);
  }

  getSetTreeByCondition(condition:string) {
    return this.http.get(`${URL}//metasetclassbycondition/${condition}`);
  }
}
