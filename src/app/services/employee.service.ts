import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Employee {
  name: string;
  email: string;
  role: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'Developer',
      status: 'Active'
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      role: 'Designer',
      status: 'Active'
    },
    {
      name: 'Alice Johnson',
      email: 'alicejohnson@example.com',
      role: 'Manager',
      status: 'Inactive'
    },
    {
      name: 'Bob Brown',
      email: 'bobbrown@example.com',
      role: 'Developer',
      status: 'Active'
    },
    {
      name: 'Charlie Davis',
      email: 'charliedavis@example.com',
      role: 'Intern',
      status: 'Active'
    }
  ];

  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(this.employees);
  employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  private editingEmployee: Employee | null = null;

  constructor() {}

  addEmployee(employee: Employee) {
    this.employees.push(employee);
    this.employeesSubject.next(this.employees);
  }

  updateEmployees(updatedList: Employee[]): void {
    this.employees = updatedList;
    this.employeesSubject.next(this.employees);
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  setEditingEmployee(emp: Employee): void {
    this.editingEmployee = emp;
  }

  getEditingEmployee(): Employee | null {
    return this.editingEmployee;
  }

  clearEditingEmployee(): void {
    this.editingEmployee = null;
  }
}
