import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { Observable } from 'rxjs';
import { MovieResponse } from '../interfaces/imovie';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _HttpClient: HttpClient) {}

  getAllMovies(): Observable<MovieResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this._HttpClient.get<MovieResponse>(
      `${environment.base_url}movie/popular?${environment.token}&language=en-US&sort_by=popularity.desc&page=1`,
      { headers }
    );
  }
}
