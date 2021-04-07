import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Checke } from '../_models/checke';


@Injectable({
  providedIn: 'root'
})
export class CheckeService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCheckes() {
    return this.http.get<Checke[]>(this.baseUrl + 'checkes');
  }

  getChecke(checkeNumber) {
    return this.http.get<Checke>(this.baseUrl + 'checkes/' + checkeNumber);
  }

  addChecke(model: any) {
    return this.http.post(this.baseUrl + 'checkes/create', model).pipe(
      map((checke: Checke) => {
        if (checke) {
          console.log(checke);
        }
      })
    )
  }
}
