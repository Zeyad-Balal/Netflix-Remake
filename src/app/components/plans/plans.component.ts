import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent implements OnInit {
  selectedPlan: 'basic' | 'standard' | 'premium' = 'premium';
  step_number = 0;
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  selectedPayment: 'card' | 'cash' = 'card';

  constructor() {
    const navigation = window.history.state;
    this.email = navigation.email || 'default@example.com';
  }

  ngOnInit(): void {
    this.step_number = 1;
  }

  selectPlan(plan: 'basic' | 'standard' | 'premium') {
    this.selectedPlan = plan;
  }

  selectPayment(method: 'card' | 'cash') {
    this.selectedPayment = method;
  }

  nextStep() {
    this.step_number++;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
