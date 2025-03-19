import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { IMovie } from '../../core/interfaces/imovie';
import { environment } from '../../core/environments/env';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-all-movies',
  standalone: true,
  imports: [CommonModule, RouterLink, SideMenuComponent, NavComponent],
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.scss'
})
export class AllMoviesComponent implements OnInit {
  movies: IMovie[] = [];
  image_path = environment.image_url;
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 30;
  loading: boolean = false;

  constructor(private _movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(page: number = 1): void {
    this.loading = true;
    this.currentPage = page;
    
    this._movieService.getTrendingMovies(page).subscribe({
      next: (response) => {
        this.movies = response.results.slice(0, this.itemsPerPage);
        this.totalPages = Math.min(response.total_pages, 500); // API usually limits to 500 pages
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching trending movies:', err);
        this.loading = false;
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadMovies(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadMovies(this.currentPage - 1);
    }
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
