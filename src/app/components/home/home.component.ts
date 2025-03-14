import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/home.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { IMovie, MovieResponse } from '../../core/interfaces/imovie';
import { environment } from '../../core/environments/env';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
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

  ngOnInit(): void {
    this._HomeService.getAllMovies().subscribe({
      next: (response: MovieResponse) => {
        this.movies = response.results;
        console.log(this.movies);
      },
    });
  }
}
