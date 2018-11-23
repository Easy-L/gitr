import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CustomHttp} from "../common/custom.http";
import {Response} from "@angular/http";
import {GatewayNodeReg} from "../domain/gateway/gateway-node-reg";
import {NodeDb} from "../domain/gateway/node-db";


export const URL: string = "/api/control";

@Injectable()
export class GatewayNodeService {

  constructor(private http: CustomHttp) {

  }

  /*
  * nodereg
  * */
  getList(): Observable<Response> {
    return this.http.get(`${URL}/nodereg/list`);
  }
  getListbycondition(condition:string): Observable<Response> {
    return this.http.get(`${URL}/nodereg/list/${condition}`);
  }

  getNodeReg(id:string) {
    return this.http.get(`${URL}/nodereg/${id}`);
  }

  postNodeReg(gatewayNodeReg:GatewayNodeReg ) {
    return this.http.post(`${URL}/nodereg`,gatewayNodeReg);
  }

  deleteNodeReg(id:string) {
    return this.http.delete(`${URL}/nodereg/${id}`);
  }

  /*
   * nodedb
   * */
  getNodeDbList(nodeid:string): Observable<Response> {
    return this.http.get(`${URL}/nodedb/list/${nodeid}`);
  }

  getNodeDb(id:string) {
    return this.http.get(`${URL}/nodedb/${id}`);
  }

  postNodeDb(nodedb:NodeDb ) {
    return this.http.post(`${URL}/nodedb`,nodedb);
  }

  deleteNodeDb(id:string) {
    return this.http.delete(`${URL}/nodedb/${id}`);
  }

  /*
   * nodetest
   * */
  getNodeTableList(id:string): Observable<Response> {
    return this.http.get(`${URL}/nodetable/list/${id}`);
  }
}
