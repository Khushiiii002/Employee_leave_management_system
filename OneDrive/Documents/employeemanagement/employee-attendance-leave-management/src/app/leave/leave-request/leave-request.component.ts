import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../core/services/leave.service';
import { EmployeeService } from '../../core/services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../models/data.models';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss'
})
export class LeaveRequestComponent implements OnInit {
  leaveForm: FormGroup;
  leaveTypes = ['Sick Leave', 'Vacation', 'Personal', 'Maternity/Paternity'];
  employees: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.leaveForm = this.fb.group({
      employeeId: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      this.leaveService.addLeaveRequest({
        ...this.leaveForm.value,
        id: 0,
        status: 'Pending'
      }).subscribe(() => {
        alert('Leave Request Submitted');
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
