import {Injectable} from '@angular/core';
import {Response,URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Params} from "../common/params";
import {CustomHttp} from "../common/custom.http";
import {TableDataClass} from "../domain/tabledataclass";
import {TableDataDetail} from "../domain/tabledatadetail";

export const URL: string = "/api/control";
@Injectable()
export class TabledataService {

  constructor(private http: CustomHttp) {

  }
  //获取根节点
  getRoot(): Observable<Response> {
    return this.http.get(`${URL}/tabledataclass/root`);
  }
  //获取树子节点
  getChildrens(id:string): Observable<Response> {
    return this.http.get(`${URL}/tabledataclass/${id}/childrens`);
  }
  //新增元数据
  post(tableDataClass: TableDataClass): Observable<Response> {
    let params = new URLSearchParams();
    for (let prop in tableDataClass) {
      if ("typeOrder" == prop) {
        continue;
      }
      params.set(prop, tableDataClass[prop]);
    }
    return this.http.post(`${URL}/tabledataclass`, params);
  }
  //根据id查找元数据
  get(id: string): Observable<Response> {

    return this.http.get(`${URL}/tabledataclass/${id}`);
  }
  //修改元数据
  put(tableDataClass: TableDataClass): Observable<Response> {
    let params = new URLSearchParams();
    for (let prop in tableDataClass) {
      if ("typeOrder" == prop) {
        continue;
      }
      params.set(prop, tableDataClass[prop]);
    }
    return this.http.put(`${URL}/tabledataclass`, params);
  }
  // 删除元数据
  delete(id: string): Observable<Response> {
    return this.http.delete(`${URL}/tabledataclass/${id}`);
  }
  //根据id查询元数据详细
  getDetails(id: string): Observable<Response> {
    return this.http.get(`${URL}/tabledatadetail/${id}/tabledatadetails`);
  }
  //新增元数据详细
  postDetail(tableDataDetail: TableDataDetail): Observable<Response> {
    let params = new URLSearchParams();
    for (let prop in tableDataDetail) {
      params.set(prop, tableDataDetail[prop]);
    }
    return this.http.post(`${URL}/tabledatadetail`, params);
  }

  //修改元数据详细
  putDetail(tableDataDetail: TableDataDetail): Observable<Response> {
    let params = new URLSearchParams();
    for (let prop in tableDataDetail) {
      params.set(prop, tableDataDetail[prop]);
    }
    console.log(params)
    return this.http.put(`${URL}/tabledatadetail`, params);
  }

  //删除元数据详细
  deleteDetail(tableDataDetails:TableDataDetail[]): Observable<Response> {

    return this.http.post(`${URL}/tabledatadetail/delete`,tableDataDetails);
  }

  //根据条件查找元数据树
  searchDataClassTree(condition:string): Observable<Response> {
    return this.http.get(`${URL}/tabledataclassbycondition/${condition}`);
  }
}
