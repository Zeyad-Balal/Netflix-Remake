import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { MovieService } from '../../core/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { IMovieDetails } from '../../core/services/imovie-details';

@Component({
  selector: 'app-movie-series-details',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './movie-series-details.component.html',
  styleUrl: './movie-series-details.component.scss'
})
export class MovieSeriesDetailsComponent implements OnInit {

  constructor(private readonly _Movie:MovieService , private readonly _ActiveRoute:ActivatedRoute){}
  MovieDetails:IMovieDetails[] = [];
  ngOnInit() {
    this._ActiveRoute.params.subscribe((params) => {
      const movieId = params['id'];
      if (movieId) {
        this._Movie.getMovieById(movieId).subscribe((res) => {
          this.MovieDetails = res;
          console.log(res);
        });
      }
    });
  }

}
