import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { UpcomingMovie } from '../../core/interfaces/upcoming.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../core/environments/env';
import { NavComponent } from "../nav/nav.component";
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-up-coming',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink, NavComponent, SideMenuComponent],
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
        this.totalPages = response.total_pages;
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
}
