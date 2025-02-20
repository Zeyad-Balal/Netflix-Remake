import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSeriesDetailsComponent } from './movie-series-details.component';

describe('MovieSeriesDetailsComponent', () => {
  let component: MovieSeriesDetailsComponent;
  let fixture: ComponentFixture<MovieSeriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSeriesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSeriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
