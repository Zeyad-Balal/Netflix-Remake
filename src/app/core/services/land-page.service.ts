import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { MovieResponse } from '../interfaces/imovie';

@Injectable({
  providedIn: 'root'
})
export class LandPageService {

  constructor(private readonly _HttpClient: HttpClient) { }


  //land page trending 10 movies

  getTrendingMovies(): Observable<MovieResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`, // v4 API Key
    });
    return this._HttpClient.get<MovieResponse>(`${environment.base_url}movie/popular?${environment.token}&language=en-US&sort_by=popularity.desc&page=1`, { headers });
  }
}
