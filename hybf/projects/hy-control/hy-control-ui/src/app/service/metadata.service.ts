import {Injectable} from '@angular/core';
import {Response,URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Params} from "../common/params";
import {CustomHttp} from "../common/custom.http";
import {MetaDataClass} from "../domain/meta-data-class";
import {MetaDataDetail} from "../domain/metadatadetail";

export const URL: string = "/api/control";
@Injectable()
export class MetadataService {

  constructor(private http: CustomHttp) {

   }
  //获取根节点
  getRoot(): Observable<Response> {
    return this.http.get(`${URL}/metadataclass/root`);
  }
  //获取树子节点
  getChildrens(id:string): Observable<Response> {
    return this.http.get(`${URL}/metadataclass/${id}/childrens`);
  }
  //新增元数据
  post(metadataclass: MetaDataClass): Observable<Response> {
    let params = new URLSearchParams();
    for (let prop in metadataclass) {
      if ("typeorder" == prop) {
        continue;
      }
      params.set(prop, metadataclass[prop]);
    }
    return this.http.post(`${URL}/metadataclass`, params);
  }
  //根据id查找元数据
  get(id: string): Observable<Response> {

    return this.http.get(`${URL}/metadataclass/${id}`);
  }
  //修改元数据
  put(metadataclass: MetaDataClass): Observable<Response> {
    let params = new URLSearchParams();
    for (let prop in metadataclass) {
      if ("typeorder" == prop) {
        continue;
      }
      params.set(prop, metadataclass[prop]);
    }
    return this.http.put(`${URL}/metadataclass`, params);
  }
  // 删除元数据
  delete(id: string): Observable<Response> {
    return this.http.delete(`${URL}/metadataclass/${id}`);
  }
  //根据id查询元数据详细
  getDetails(id: string): Observable<Response> {
    return this.http.get(`${URL}/metadatadetail/${id}/metadatadetails`);
  }
  //新增元数据详细
  postDetail(metadatadetail: MetaDataDetail): Observable<Response> {
    let params = new URLSearchParams();
    for (let prop in metadatadetail) {
      params.set(prop, metadatadetail[prop]);
    }
    return this.http.post(`${URL}/metadatadetail`, params);
  }

  //修改元数据详细
  putDetail(metadatadetail: MetaDataDetail): Observable<Response> {
    let params = new URLSearchParams();
    for (let prop in metadatadetail) {
      params.set(prop, metadatadetail[prop]);
    }
    console.log(params)
    return this.http.put(`${URL}/metadatadetail`, params);
  }

  //删除元数据详细
  deleteDetail(metadatadetails:MetaDataDetail[]): Observable<Response> {

    return this.http.post(`${URL}/metadatadetail/delete`,metadatadetails);
  }

  //根据条件查找元数据树
  searchDataClassTree(condition:string): Observable<Response> {
    return this.http.get(`${URL}/metadataclassbycondition/${condition}`);
  }
}
