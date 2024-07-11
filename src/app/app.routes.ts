import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ShowEmployeeComponent } from './show-employee/show-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';

export const routes: Routes = [
    { path:'',component:ShowEmployeeComponent},
    { path:'empList',component:EmployeeListComponent},
    { path:'add-employee',component:AddEmployeeComponent},
    { path:'edit-employee',component:EditEmployeeComponent},
    { path:'emp-details/:id',component:EmpDetailsComponent}
];
