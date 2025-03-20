import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { UpcomingMovie } from '../../core/interfaces/upcoming.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../core/environments/environment';
import { NavComponent } from "../nav/nav.component";
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-up-coming',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink,SideMenuComponent],
  providers: [MovieService, HttpClient],
  templateUrl: './up-coming.component.html',
  styleUrl: './up-coming.component.scss'
})
export class UpComingComponent implements OnInit {
  upcomingMovies: UpcomingMovie[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  image_path = environment.image_url;
  
  constructor(private _MovieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(page: number = 1) {
    this._MovieService.getUpcomingMovies(page).subscribe({
      next: (response) => {
        this.upcomingMovies = response.results;
        this.totalPages = Math.min(response.total_pages, 500); // API usually limits to 500 pages max
        this.currentPage = page;
      },
      error: (err) => {
        console.error('Error fetching upcoming movies:', err);
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadMovies(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.loadMovies(this.currentPage - 1);
    }
  }

  getStarRating(rating: number): number[] {
    const stars = Math.round(rating / 2);
    return Array(5).fill(0).map((_, index) => (index < stars ? 1 : 0));
  }
  
  isComingSoon(releaseDate: string): boolean {
    const today = new Date();
    const release = new Date(releaseDate);
    // If release date is in the future
    return release > today;
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
}
