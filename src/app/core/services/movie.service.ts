import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { UpcomingMoviesResponse } from '../interfaces/upcoming.interface';
import { MovieResponse } from '../interfaces/imovie';
import { TvShowsResponse } from '../interfaces/tv-shows.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private readonly _HttpClient: HttpClient) { }

  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.token}`,
    accept: 'application/json'
  });

  getMovieById(id:string):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this._HttpClient.get(
      `${environment.base_url}movie/${id}`,
      { headers }
    );
  }

  getUpcomingMovies(page: number = 1): Observable<UpcomingMoviesResponse> {
    return this._HttpClient.get<UpcomingMoviesResponse>(
      `${environment.base_url}movie/upcoming?language=en-US&page=${page}`,
      { headers: this.headers }
    );
  }

  getTrendingMovies(page: number = 1): Observable<MovieResponse> {
    return this._HttpClient.get<MovieResponse>(
      `${environment.base_url}trending/movie/day?language=en-US&page=${page}`,
      { headers: this.headers }
    );
  }

  getTopRatedTvShows(page: number = 1): Observable<TvShowsResponse> {
    return this._HttpClient.get<TvShowsResponse>(
      `${environment.base_url}tv/top_rated?language=en-US&page=${page}`,
      { headers: this.headers }
    );
  }
}
