import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HomeService } from '../../core/services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {


  constructor(private readonly _HomeService : HomeService) { }

  ngOnInit(): void {
    this._HomeService.getTopMovies().subscribe(
    {
      next: (data) => {
        console.log(data);
      }
    }
    )
  }
}
