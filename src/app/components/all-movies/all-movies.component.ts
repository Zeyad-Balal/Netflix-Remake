import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { IMovie } from '../../core/interfaces/imovie';
import { environment } from '../../core/environments/env';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { NavComponent } from '../nav/nav.component';
import { HomeService } from '../../core/services/home.service';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-all-movies',
  standalone: true,
  imports: [CommonModule, RouterLink, SideMenuComponent, NavComponent, FormsModule],
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.scss'
})
export class AllMoviesComponent implements OnInit, OnDestroy {
  movies: IMovie[] = [];
  image_path = environment.image_url;
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 30;
  loading: boolean = false;
  query: string = '';
  isSearching: boolean = false;
  
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  constructor(
    private _movieService: MovieService,
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.loadMovies();
    
    // Set up search with debounce
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged() // Only emit when the current value is different than the last
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadMovies(page: number = 1): void {
    this.loading = true;
    this.currentPage = page;
    this.isSearching = false;
    
    this._movieService.getTrendingMovies(page).subscribe({
      next: (response) => {
        this.movies = response.results.slice(0, this.itemsPerPage);
        this.totalPages = Math.min(response.total_pages, 500);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching trending movies:', err);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    // This method is triggered by keypresses
    this.searchSubject.next(this.query);
  }

  performSearch(query: string): void {
    if (query.trim()) {
      this.loading = true;
      this.isSearching = true;
      
      this._homeService.searchOnMovie(query).subscribe({
        next: (res) => {
          this.movies = res.results;
          this.totalPages = Math.min(res.total_pages, 500);
          this.currentPage = 1;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error searching movies:', err);
          this.loading = false;
        }
      });
    } else {
      // If search query is empty, reset to trending movies
      this.loadMovies(1);
    }
  }

  clearSearch(): void {
    if (this.isSearching) {
      this.query = '';
      this.loadMovies(1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      if (this.isSearching) {
        this.searchPage(this.currentPage + 1);
      } else {
        this.loadMovies(this.currentPage + 1);
      }
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      if (this.isSearching) {
        this.searchPage(this.currentPage - 1);
      } else {
        this.loadMovies(this.currentPage - 1);
      }
    }
  }

  searchPage(page: number): void {
    this.loading = true;
    this.currentPage = page;
    
    this._homeService.searchOnMovie(this.query, page).subscribe({
      next: (res) => {
        this.movies = res.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error searching movies:', err);
        this.loading = false;
      }
    });
  }

  getStarRating(rating: number): number[] {
    const stars = Math.round(rating / 2);
    return Array(5).fill(0).map((_, index) => (index < stars ? 1 : 0));
  }

  getVisiblePages(): number[] {
    const visiblePages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    
    return visiblePages;
  }

  // Get the chunks of movies (5 per row)
  getMovieRows(): IMovie[][] {
    const rows: IMovie[][] = [];
    for (let i = 0; i < this.movies.length; i += 5) {
      rows.push(this.movies.slice(i, i + 5));
    }
    return rows;
  }
}
