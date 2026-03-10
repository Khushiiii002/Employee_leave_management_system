import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttendanceService } from '../../core/services/attendance.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AttendanceRecord, Employee } from '../../models/data.models';

@Component({
  selector: 'app-attendance-tracker',
  templateUrl: './attendance-tracker.component.html',
  styleUrl: './attendance-tracker.component.scss'
})
export class AttendanceTrackerComponent implements OnInit {
  attendanceForm: FormGroup;
  statuses = ['Present', 'Absent', 'Late', 'Leave'];
  employees: Employee[] = [];
  attendanceRecords: AttendanceRecord[] = [];
  displayedColumns: string[] = ['date', 'employee', 'status']; // Adjusted columns

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService
  ) {
    this.attendanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      date: [new Date(), Validators.required],
      status: ['Present', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAttendance();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  loadAttendance() {
    this.attendanceService.getAttendanceRecords().subscribe(data => this.attendanceRecords = data);
  }

  getEmployeeName(id: number): string {
    const employee = this.employees.find(e => e.id === id);
    return employee ? employee.name : 'Unknown';
  }

  onSubmit() {
    if (this.attendanceForm.valid) {
      const record: AttendanceRecord = {
        id: Math.floor(Math.random() * 1000),
        ...this.attendanceForm.value,
        date: this.attendanceForm.value.date.toISOString().split('T')[0]
      };

      this.attendanceService.addAttendance(record).subscribe(() => {
        alert('Attendance Recorded!');
        this.loadAttendance();
        this.attendanceForm.reset({ date: new Date(), status: 'Present' });
      });
    }
  }
}
