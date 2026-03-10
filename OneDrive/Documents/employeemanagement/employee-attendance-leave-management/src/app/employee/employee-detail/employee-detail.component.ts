import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { LeaveService } from '../../core/services/leave.service';
import { Employee, AttendanceRecord, LeaveRequest } from '../../models/data.models';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  attendanceRecords: AttendanceRecord[] = [];
  leaveRequests: LeaveRequest[] = [];
  attendanceColumns: string[] = ['date', 'status'];
  leaveColumns: string[] = ['startDate', 'endDate', 'reason', 'status'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(id).subscribe(emp => {
      this.employee = emp || null;
    });
    this.attendanceService.getAttendanceByEmployee(id).subscribe(records => {
      this.attendanceRecords = records;
    });
    this.leaveService.getLeaveRequestsByEmployee(id).subscribe(reqs => {
      this.leaveRequests = reqs;
    });
  }

  goBack(): void {
    this.router.navigate(['/employee']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Present': return 'status-present';
      case 'Absent': return 'status-absent';
      case 'Late': return 'status-late';
      case 'Leave': return 'status-leave';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  }
}
