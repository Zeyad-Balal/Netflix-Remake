import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { MovieService } from '../../core/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { IMovieDetails } from '../../core/services/imovie-details';
import e from 'express';
import { environment } from '../../core/environments/environment';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-series-details',
  standalone: true,
  imports: [NavComponent, CommonModule, DatePipe, DecimalPipe],
  templateUrl: './movie-series-details.component.html',
  styleUrl: './movie-series-details.component.scss'
})
export class MovieSeriesDetailsComponent implements OnInit {

  constructor(private readonly _Movie: MovieService, private readonly _ActiveRoute: ActivatedRoute) { }
  movieDetails: IMovieDetails | null = null;
  image_path = environment.image_url;
  ngOnInit() {
    const movieId = this._ActiveRoute.snapshot.paramMap.get('id');
    if (movieId) {
      this._Movie.getMovieById(movieId).subscribe((res) => {
        this.movieDetails = res;
        console.log(res);
      });
    }
  }
  
}
