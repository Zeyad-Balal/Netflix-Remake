import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private readonly _HttpClient: HttpClient) { }

  getMovieById(id:string):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this._HttpClient.get(
      `${environment.base_url}movie/${id}`,
      { headers }
    );
  }

}
