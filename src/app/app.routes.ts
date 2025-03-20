import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieSeriesDetailsComponent } from './components/movie-series-details/movie-series-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PlansComponent } from './components/plans/plans.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { LoginComponent } from './components/login/login.component';
import { LandPageComponent } from './components/land-page/land-page.component';
import { UpComingComponent } from './components/up-coming/up-coming.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { Sign } from 'crypto';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign up',
  },
  {
    path: 'land',
    component: LandPageComponent,
    title: 'Netflix',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    children: [
      // {
      //   path: 'movies',
      //   component: MovieSeriesDetailsComponent,
      //   title: 'Movies',
      // }
    ]
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
  {
    path: 'details/:id',
    component: MovieSeriesDetailsComponent,
    title: 'Movies',
  },
  {
    path: 'all-movies',
    component: AllMoviesComponent,
    title: 'Movies',
  },
  {
    path: 'top-rated',
    component: TopRatedComponent,
    title: 'Top Rated',
  },
  {
    path: 'up-coming',
    component: UpComingComponent,
    title: 'up coming',
  }
];
