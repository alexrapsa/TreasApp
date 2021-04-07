import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Checke } from '../_models/checke';


@Injectable({
  providedIn: 'root'
})
export class CheckeService {
  baseUrl = environment.apiUrl;
  checkes: Checke[] = [];
  constructor(private http: HttpClient) { }

  getCheckes() {
    if (this.checkes.length > 0) return of(this.checkes);
    console.log('check service');
    return this.http.get<Checke[]>(this.baseUrl + 'checkes').pipe(
      map(checkes => {
        this.checkes = checkes;
        return checkes;
      })
    )
  }

  getChecke(checkeNumber) {
    const checke = this.checkes.find(x => x.checkNumber === checkeNumber);
    if (checke !== undefined) return of(checke);
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
