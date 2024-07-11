import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emp-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './emp-details.component.html',
  styleUrl: './emp-details.component.css'
})
export class EmpDetailsComponent {
  emp: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    // Get the ID from the route parameters and fetch the loan application details
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getDetails(id);
    }
  }
  
  getDetails(id: string): void {
    this.http.get<any>(`https://dummy.restapiexample.com/api/v1/employee/${id}`).subscribe({
      next: (data) => {
        this.emp = data.data; // Assign fetched data to loanApplication
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching loan application:', error);
        // Handle error fetching loan application
      }
    });
  }
}
