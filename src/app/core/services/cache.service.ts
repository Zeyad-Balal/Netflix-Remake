import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private _HttpClient: HttpClient) { }


  private cacheKey = 'apiData';

  getCachedData(): any | null {
    const data = localStorage.getItem(this.cacheKey);
    return data ? JSON.parse(data) : null;
  }

  setCachedData(data: any): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(data));
  }
}
