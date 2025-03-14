import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/home.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { IMovie, MovieResponse } from '../../core/interfaces/imovie';
import { environment } from '../../core/environments/env';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CarouselModule,
    // RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  movies: IMovie[] = [];
  image_path = environment.image_url;

  constructor(private readonly _HomeService: HomeService) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this._HomeService.getAllMovies().subscribe({
      next: (response: MovieResponse) => {
        this.movies = response.results;
        console.log(this.movies);
      },
    });
  }

  getStarRating(rating: number): number[] {
    // Convert 10-point scale to 5-point scale
    const fiveStarRating = Math.round(rating / 2);
    return Array(5)
      .fill(0)
      .map((_, index) => (index < fiveStarRating ? 1 : 0));
  }
}
