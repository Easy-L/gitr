import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {MedicHospital} from "../domain/checkcode/medic-hospital";
import {IcdHospital} from "../domain/checkcode/icd-hospital";


export const URLs: string = "/api/agent";
export const URLCheckCode: string = "/api/agent/checkcode";
@Injectable()
export class CheckCodeService {

  constructor(private http:HttpClient) { }

  downloadicdoper(): Observable<any> {
    return this.http.get(`${URLs}/download/ypbm/手术字典.xlsx`,{responseType:"blob"});
  }
  downloadserver(): Observable<any> {
    return this.http.get(`${URLs}/download/ypbm/医疗服务字典.xlsx`,{responseType:"blob"});
  }

  downloadmedic(): Observable<any> {
    return this.http.get(`${URLs}/download/ypbm/药品字典.xlsx`,{responseType:"blob"});
  }

  downloadicd(): Observable<any> {
    return this.http.get(`${URLs}/download/ypbm/疾病字典.xlsx`,{responseType:"blob"});
  }

  medicHospitalList(medicHospital:MedicHospital): Observable<any> {
    return this.http.post(`${URLs}/checkcode/medichospital/list`,medicHospital);
  }

  icdHospitalList(IcdHospital:IcdHospital): Observable<any> {
    return this.http.post(`${URLs}/checkcode/icdhospital/list`,IcdHospital);
  }

  savemediccheckcode(medicHospital:MedicHospital): Observable<any> {
    return this.http.post(`${URLs}/checkcode/savemediccheckcode`,medicHospital,{ observe: 'response' });
  }

  saveicdcheckcode(IcdHospital:IcdHospital): Observable<any> {
    return this.http.post(`${URLs}/checkcode/saveicdcheckcode`,IcdHospital,{ observe: 'response' });
  }

  downFile(result,fileName,fileType?){
    let data=result;
    let blob = new Blob([data], {type: fileType||data.type});
    let objectUrl = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', fileName);
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}
