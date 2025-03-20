import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {
  selectedPlan: 'basic' | 'standard' | 'premium' = 'premium';

  selectPlan(plan: 'basic' | 'standard' | 'premium') {
    this.selectedPlan = plan;
  }
}
