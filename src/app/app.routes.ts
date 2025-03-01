import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieSeriesDetailsComponent } from './components/movie-series-details/movie-series-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PlansComponent } from './components/plans/plans.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'plans',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'movies',
    component: MovieSeriesDetailsComponent,
    title: 'Movies',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'user profile',
  },
  {
    path: 'plans',
    component: PlansComponent,
    title: 'plans',
  },
  {
    path: 'watch-list',
    component: WatchListComponent,
    title: 'watch list',
  },
];
