import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { Observable, of, tap } from 'rxjs';
import { MovieResponse } from '../interfaces/imovie';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private headers: HttpHeaders;

  constructor(private _HttpClient: HttpClient, private _CacheService: CacheService) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
      accept: 'application/json'
    });
  }

  getAllMovies(): Observable<MovieResponse> {

    const cacheData = this._CacheService.getCachedData();
    if (cacheData) {
      return of(cacheData); // Return cached data if it exists
    }
    else {
      return this._HttpClient.get<MovieResponse>(
        `${environment.base_url}movie/popular?${environment.token}&language=en-US&sort_by=popularity.desc&page=1`,
        { headers: this.headers }
      ).pipe(
        tap(data => this._CacheService.setCachedData(data)) // Cache the response
      );
    }
  }

  searchOnMovie(query: string, page: number = 1): Observable<MovieResponse> {
    return this._HttpClient.get<MovieResponse>(
      `${environment.base_url}search/movie?query=${query}&language=en-US&page=${page}`,
      { headers: this.headers }
    );
  }
}
