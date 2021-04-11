import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Checke } from '../_models/checke';
import { CheckeParams } from '../_models/checkeParams';
import { PaginatedResult } from '../_models/pagination';


@Injectable({
  providedIn: 'root'
})
export class CheckeService {
  baseUrl = environment.apiUrl;
  checkes: Checke[] = [];

  constructor(private http: HttpClient) { }

  getCheckes(checkeParams: CheckeParams) {
    let params = this.getPaginationHeaders(checkeParams.pageNumber, checkeParams.pageSize);

    params = params.append('minDate', checkeParams.minDate.toString());
    params = params.append('maxDate', checkeParams.maxDate.toString());

    return this.getPaginatedResult<Checke[]>(this.baseUrl + 'checkes', params)
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

  deleteChecke(checkeNumber) {
    return this.http.delete(this.baseUrl + 'checkes/' + checkeNumber);
  }

  updateChecke(checke: Checke) {
    return this.http.put(this.baseUrl + 'checkes/update', checke);
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));

          return paginatedResult;
        }
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return params;
  }
}
