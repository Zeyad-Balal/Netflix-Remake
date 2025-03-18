import { Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { MovieResponse } from '../interfaces/imovie';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class LandPageService {

  constructor(private readonly _HttpClient: HttpClient, private readonly _CacheService: CacheService) { }


  //land page trending 10 movies

  getTrendingMovies(): Observable<MovieResponse> {
    const cacheData = this._CacheService.getCachedData();
    if (cacheData) {
      return of(cacheData); // Return cached data if it exists
    }
    else {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${environment.token}`, // v4 API Key
      });
      return this._HttpClient.get<MovieResponse>(`${environment.base_url}movie/popular?${environment.token}&language=en-US&sort_by=popularity.desc&page=1`, { headers }).pipe(
        tap(data => this._CacheService.setCachedData(data)) // Cache the response
      );
    }
  }
}
