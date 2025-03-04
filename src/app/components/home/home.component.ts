import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HomeService } from '../../core/services/home.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {


  movies = [
    { title: "John Wick 4", poster: "https://image.tmdb.org/t/p/w500/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg" },
    { title: "Avatar: The Way of Water", poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
    { title: "The Equalizer 3", poster: "https://image.tmdb.org/t/p/w500/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg" }, // Replaced Oppenheimer
    { title: "Transformers: Rise of the Beasts", poster: "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg" }, // Replaced Spider-Man
    { title: "The Batman", poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
    { title: "Mission Impossible: Dead Reckoning", poster: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg" },
    { title: "Fast X", poster: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg" }, // Replaced Dune: Part Two
    { title: "Black Panther: Wakanda Forever", poster: "https://image.tmdb.org/t/p/w500/ps2oKfhY6DL3alynlSqY97gHSsg.jpg" },
    { title: "The Flash", poster: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg" },
    { title: "Guardians of the Galaxy Vol. 3", poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg" },
    { title: "The Nun II", poster: "https://image.tmdb.org/t/p/w500/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg" }, // Replaced The Marvels
    { title: "Thor: Love and Thunder", poster: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg" },
    { title: "Doctor Strange in the Multiverse of Madness", poster: "https://image.tmdb.org/t/p/w500/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg" },
    { title: "Top Gun: Maverick", poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" },
    { title: "The Matrix Resurrections", poster: "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg" },
    { title: "The Batman", poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
    { title: "Shazam! Fury of the Gods", poster: "https://image.tmdb.org/t/p/w500/3GrRgt6CiLIUXUtoktcv1g2iwT5.jpg" },
    { title: "Ant-Man and the Wasp: Quantumania", poster: "https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg" },
    { title: "Evil Dead Rise", poster: "https://image.tmdb.org/t/p/w500/mIBCtPvKZQlxubxKMeViO2UrP3q.jpg" }, // Extra replacement to make the list better
    { title: "Wonder Woman 1984", poster: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg" }
  ];

  constructor(private readonly _HomeService : HomeService) { }

  ngOnInit(): void {
    this._HomeService.getAllMovies().subscribe(
    {
      next: (data) => {
        console.log(data);
      }
    }
    )
  }
}
