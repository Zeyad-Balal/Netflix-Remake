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

  getAllMovies() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`, // v4 API Key
    });
    return this._HttpClient.get(`${environment.base_url}movie/popular?${environment.token}&language=en-US&sort_by=popularity.desc&page=1` , {headers});  
  
  }
}
