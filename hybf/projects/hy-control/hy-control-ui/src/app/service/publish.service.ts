import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {MetasetPublish} from "../domain/gateway/metaset-publish";

export const URLs: string = "/api/control";
@Injectable()
export class PublishService {

  constructor(private http:HttpClient) { }
  list(MetasetPublish:MetasetPublish): Observable<any> {
    return this.http.post(`${URLs}/metasetpublish/list`,MetasetPublish);
  }

  addsave(MetasetPublish:MetasetPublish): Observable<any> {
    return this.http.post(`${URLs}/metasetpublish/addsave`,MetasetPublish);
  }

  add(): Observable<any> {
    // { observe: 'response' }
    return this.http.get(`${URLs}/metasetpublish/add`);
  }

  publish(MetasetPublish:MetasetPublish): Observable<any> {
    return this.http.post(`${URLs}/metasetpublish/publishmessage`,MetasetPublish);
  }

  datachecklist(MetasetPublish:MetasetPublish): Observable<any> {
    return this.http.post(`${URLs}/datacheckpublish/list`,MetasetPublish);
  }

  datacheckaddsave(MetasetPublish:MetasetPublish): Observable<any> {
    return this.http.post(`${URLs}/datacheckpublish/addsave`,MetasetPublish);
  }

  datacheckadd(): Observable<any> {
    // { observe: 'response' }
    return this.http.get(`${URLs}/datacheckpublish/add`);
  }

  datacheckpublish(MetasetPublish:MetasetPublish): Observable<any> {
    return this.http.post(`${URLs}/datacheckpublish/publishmessage`,MetasetPublish);
  }
}
