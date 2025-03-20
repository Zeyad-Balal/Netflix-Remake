import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/services/movie.service';
import { TvShow } from '../../core/interfaces/tv-shows.interface';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [CommonModule, SideMenuComponent],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.scss'
})
export class TopRatedComponent implements OnInit {
  tvShows: TvShow[] = [];
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500';
  currentPage: number = 1;
  totalPages: number = 0;
  loading: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadTopRatedShows(1);
  }

  loadTopRatedShows(page: string | number) {
    if (typeof page === 'string' && page === '...') return;
    
    const pageNumber = Number(page);
    if (isNaN(pageNumber)) return;
    
    this.loading = true;
    this.movieService.getTopRatedTvShows(pageNumber).subscribe({
      next: (response) => {
        this.tvShows = response.results;
        this.totalPages = response.total_pages;
        this.currentPage = pageNumber;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getStarRating(rating: number): number[] {
    const stars = Math.round(rating / 2);
    return Array(5).fill(0).map((_, index) => (index < stars ? 1 : 0));
  }

  getVisiblePages(): (number | string)[] {
    const delta = 2;
    const range: (number | string)[] = [];
    for (let i = Math.max(2, this.currentPage - delta); i <= Math.min(this.totalPages - 1, this.currentPage + delta); i++) {
      range.push(i);
    }
    if (this.currentPage - delta > 2) {
      range.unshift('...');
    }
    if (this.currentPage + delta < this.totalPages - 1) {
      range.push('...');
    }
    range.unshift(1);
    if (this.totalPages !== 1) {
      range.push(this.totalPages);
    }
    return range;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadTopRatedShows(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.loadTopRatedShows(this.currentPage - 1);
    }
  }
}
