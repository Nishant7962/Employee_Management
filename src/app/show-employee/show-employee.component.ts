import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-employee',
  standalone: true,
  imports: [],
  templateUrl: './show-employee.component.html',
  styleUrl: './show-employee.component.css',
})
export class ShowEmployeeComponent {

  constructor(private router: Router) {}

  showEmpList(): void {
    this.router.navigate(['/empList']);
  }

}
