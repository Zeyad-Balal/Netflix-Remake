import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _HttpClient: HttpClient
  ) { }

  getTopMovies() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`, // v4 API Key
    });
    return this._HttpClient.get(`${environment.base_url}discover/movie?${environment.token}&language=en-US&sort_by=popularity.desc&page=1` , {headers});
  
  }
}
