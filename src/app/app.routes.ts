import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'add-employee',
    loadComponent: () =>
      import('./employee-form/employee-form.component').then(
        (m) => m.EmployeeFormComponent
      ),
  },
  {
    path: 'employee-list',
    loadComponent: () =>
      import('./employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
  },
];
