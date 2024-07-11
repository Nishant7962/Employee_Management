import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  addForm: FormGroup;
  addObj: any = {
    employee_name: '',
    employee_salary: '',
    employee_age: ''
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.addForm = this.fb.group({
      employee_name: ['', Validators.required],
      employee_salary: ['', Validators.required],
      employee_age: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addForm.valid) {
      this.addObj = this.addForm.value;
      this.http.post("https://dummy.restapiexample.com/api/v1/create", this.addObj, { observe: 'response' }).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            alert("Employee Added successfully...");
            this.router.navigate(['/empList']);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert("Bad Request: Please check your input fields.");
          } else if (error.status === 401) {
            alert("Unauthorized: Invalid credentials");
          } else {
            alert("An error occurred: " + error.message);
          }
        }
      });
    } else {
      alert("Please fill in all required fields correctly.");
    }
  }

  // Getter for easier access to form controls in the template
  get formControls() {
    return this.addForm.controls;
  }
}