import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class LayoutService {

  private menuUrl = 'assets/data/menu.json';

  constructor(private http: HttpClient) {
  }

  getMenu(): Promise<any[]> {
    const url = `${this.menuUrl}`;
    return this.http.get(url)
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(res => res);
  }
}
