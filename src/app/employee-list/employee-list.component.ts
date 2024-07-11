import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, delay, delayWhen, mergeMap, retryWhen, scan } from 'rxjs/operators';
import { of, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employee: any[] = [];
  errorMessage: string = '';
  private apiUrl = 'https://dummy.restapiexample.com/api/v1';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployee();
  }

  fetchEmployee(): void {
    this.http.get<any>('https://dummy.restapiexample.com/api/v1/employees').pipe(
      retryWhen(errors =>
        errors.pipe(
          scan((retryCount, err) => {
            if (retryCount >= 5 || err.status !== 429) {
              throw err;
            }
            this.errorMessage = `Too many requests. Retrying in ${(retryCount + 1) * 2} seconds...`;
            return retryCount + 1;
          }, 0),
          delayWhen(retryCount => timer((retryCount + 1) * 2000))
        )
      ),
      catchError(error => {
        this.errorMessage = 'Error fetching employees. Please try again later.';
        console.error('Error fetching employees:', error);
        // Return an empty array to maintain type consistency
        return of({ status: 'error', data: [] });  
      })
    ).subscribe({
      next: (response) => {
        if (response && response.status === 'success') {
          this.employee = response.data;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Unexpected response status: ' + (response?.status || 'unknown');
          console.error('Unexpected response status:', response?.status || 'unknown');
        }
      },
      error: (error) => {
        // This should now not be reached due to catchError above
        console.error('Error fetching employees:', error);
      }
    });
  }
  
  deleteEmployee(id: string): void {
    this.http.delete<any>(`${this.apiUrl}/delete/${id}`).pipe(
      retryWhen(errors =>
        errors.pipe(
          scan((retryCount, err) => {
            if (retryCount >= 5 || err.status !== 429) {
              throw err;
            }
            this.errorMessage = `Too many requests. Retrying in ${(retryCount + 1) * 2} seconds...`;
            return retryCount + 1;
          }, 0),
          delayWhen(retryCount => timer((retryCount + 1) * 2000))
        )
      ),
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = 'Error deleting employee. Please try again later.';
        console.error('Error deleting employee:', error);
        // Return a fallback observable in case of error
        return throwError(() => new Error('Error deleting employee'));
      })
    ).subscribe({
      next: () => {
        // On success, remove the employee from the list
        this.employee = this.employee.filter(emp => emp.id !== id);
        this.errorMessage = '';
      },
      error: (error) => {
        // Handle errors from the delete operation
        console.error('Error deleting employee:', error);
      }
    });
  }
  
  
  viewEmpDetails(id: string): void {
    this.router.navigate(['/emp-details', id]);
  }


  editEmployee(id: string): void {
    this.router.navigate(['/edit-employee']);
  }

  showAddEmployeeForm():void{
    this.router.navigate(['/add-employee']);
  }
}