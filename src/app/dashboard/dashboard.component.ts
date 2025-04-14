import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EmployeeService, Employee } from '../services/employee.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  editingIndex: number | null = null;
  editableEmployee: Employee = { name: '', email: '', role: '', status: '' };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

  startEdit(index: number) {
    this.editingIndex = index;
    this.editableEmployee = { ...this.employees[index] }; 
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editableEmployee = { name: '', email: '', role: '', status: '' };
  }

  saveEdit(index: number) {
    this.employees[index] = { ...this.editableEmployee };
    this.employeeService.updateEmployees(this.employees);
    this.cancelEdit();
  }

  deleteRow(index: number) {
    this.employees.splice(index, 1);
    this.employeeService.updateEmployees(this.employees);
    this.cancelEdit();
  }
}
