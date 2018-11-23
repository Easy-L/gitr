import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {GatewayConfig} from "../domain/gateway/gateway-config";
import {ExtraConfig} from "../domain/gateway/extra-config";

export const URLs: string = "/api/control";
@Injectable()
export class GatewayConfigService {

  constructor(private http:HttpClient) { }

  getNodedb(gatewayConfig:GatewayConfig): Observable<any> {
    return this.http.post(`${URLs}/sendDbExtra`,gatewayConfig,{ observe: 'response' });
  }

  nodestatus(): Observable<any> {
    return this.http.post(`${URLs}/nodestatus`,null,{ observe: 'response' });
  }

  getnodestatus(): Observable<any> {
    return this.http.get(`${URLs}/getnodestatus`);
  }

  getextraconfiglist(extraconfig:ExtraConfig): Observable<any> {
    return this.http.post(`${URLs}/extraconfig/list`,extraconfig);
  }

  saveextraconfig(extraconfig:ExtraConfig): Observable<any> {
    return this.http.post(`${URLs}/extraconfig/add`,extraconfig);
  }
}
