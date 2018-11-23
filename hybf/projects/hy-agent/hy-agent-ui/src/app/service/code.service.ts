import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {CustomHttp} from "../common/custom.http";
import {Medic} from "../domain/medic";
import {Icd} from "../domain/icd";
import {IcdOper} from "../domain/icd-oper";
import {Server} from "../domain/server";
import {Basedatadescribe} from "../domain/basedatadescribe";
import {ServerHospital} from "../domain/server-hospital";
import {Params} from "../common/params";
import {URLCheckCode} from "./check-code.service";
import {IcdOperHospital} from "../domain/icd-oper-hospital";


export const URLs: string = "/api/agent";
@Injectable()
export class CodeService {

  constructor(private http:CustomHttp) { }

  getbasedatadescripeByPage(basedatadescribe: Basedatadescribe): Observable<Response> {
    return this.http.post(`${URLs}/basedatadescribe/list`,basedatadescribe);
  }

  getmediclistByPage(medic: Medic): Observable<Response> {
    return this.http.post(`${URLs}/medic/list`,medic);
  }

  geticdlistByPage(icd: Icd): Observable<Response> {
    return this.http.post(`${URLs}/icd/list`,icd);
  }

  geticdoperlistByPage(icdoper: IcdOper): Observable<Response> {
    return this.http.post(`${URLs}/icdoper/list`,icdoper);
  }

  getserverlistByPage(server: Server): Observable<Response> {
    return this.http.post(`${URLs}/server/list`,server);
  }

  getmediclistByCondition(medic: Medic): Observable<Response> {
    return this.http.post(`${URLs}/medic/list/condition`,medic);
  }

  geticdlistByCondition(icd: Icd): Observable<Response> {
    return this.http.post(`${URLs}/icd/list/condition`,icd);
  }

  geticdoperlistByCondition(icdoper: IcdOper): Observable<Response> {
    return this.http.post(`${URLs}/icdoper/list/condition`,icdoper);
  }

  getserverlistByCondition(server: Server): Observable<Response> {
    return this.http.post(`${URLs}/server/list/condition`,server);
  }

  //平台手术编码
  geticdoperlist(params1: Params): Observable<Response> {
    return this.http.post(`${URLCheckCode}/icdoper/geticdoperlist`,params1);
  }
  //根据是否匹配查找
  geticdoperlistByMatingCondition(params: Params): Observable<Response> {
    return this.http.post(`${URLCheckCode}/icdoper/matingcondition`,params);
  }

  //根据选择字段匹配查找
  loadicdoperListChooseMatch(params: Params): Observable<Response> {
    return this.http.post(`${URLCheckCode}/icdoper/matingconditionchoose`,params);
  }
  //根据选择的医院药品字典行
  loadicdoperListOnRow(icdOperHospital: IcdOperHospital): Observable<Response> {
    return this.http.post(`${URLCheckCode}/icdoper/onRow`,icdOperHospital);
  }
  //保存匹配关系
  saveIcdoperMatingRelations(chosedIcdoperHospitals: Array<IcdOperHospital>): Observable<Response> {
    return this.http.put(`${URLCheckCode}/icdoper/saveIcdoperMatingRelations`,chosedIcdoperHospitals);
  }

  //医疗服务项目编码对码
  getserverlist(serverparams1: Params): Observable<Response> {
    return this.http.post(`${URLCheckCode}/server/getserverlist`,serverparams1);
  }
  //根据是否匹配查找
  getserverlistByMatingCondition(params: Params): Observable<Response> {
    return this.http.post(`${URLCheckCode}/server/matingcondition`,params);
  }

  //根据选择字段匹配查找
  loadserverListChooseMatch(serverparamschosed: Params): Observable<Response> {
    return this.http.post(`${URLCheckCode}/server/matingconditionchoose`,serverparamschosed);
  }
  //根据选择的医院药品字典行
  loadserverListOnRow(serverHospital: ServerHospital): Observable<Response> {
    return this.http.post(`${URLCheckCode}/server/onRow`,serverHospital);
  }
  //保存匹配关系
  saveServerMatingRelations(chosedServerHospitals: Array<ServerHospital>): Observable<Response> {
    return this.http.put(`${URLCheckCode}/server/saveServerMatingRelations`,chosedServerHospitals);
  }
  //医疗服务项目编码end
}
