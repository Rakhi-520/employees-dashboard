import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  roles = ['Developer', 'Designer', 'Manager'];
  statuses = ['Active', 'Inactive'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const empToEdit = this.employeeService.getEditingEmployee();
    if (empToEdit) {
      this.employeeForm.patchValue(empToEdit);
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value);
      this.employeeService.clearEditingEmployee(); // clear edit mode
      this.router.navigate(['/']); // Go back to dashboard
    }
  }

  onCancel() {
    this.employeeService.clearEditingEmployee();// optional: reset state
    this.router.navigate(['/']); // Go back to dashboard
  }
}
