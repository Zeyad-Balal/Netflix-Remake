import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { Observable } from 'rxjs';
import { MovieResponse } from '../interfaces/imovie';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private headers: HttpHeaders;

  constructor(private _HttpClient: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
      accept: 'application/json'
    });
  }

  getAllMovies(): Observable<MovieResponse> {
    return this._HttpClient.get<MovieResponse>(
      `${environment.base_url}movie/popular?${environment.token}&language=en-US&sort_by=popularity.desc&page=1`,
      { headers: this.headers }
    );
  }

  searchOnMovie(query: string): Observable<MovieResponse> {
    return this._HttpClient.get<MovieResponse>(
      `${environment.base_url}search/movie?query=${query}&language=en-US&page=1`,
      { headers: this.headers }
    );
  }
}
