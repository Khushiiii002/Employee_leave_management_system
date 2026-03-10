import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { LeaveService } from '../../core/services/leave.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalEmployees$ = this.employeeService.getEmployees().pipe(map(emps => emps.length));

  presentToday$ = this.attendanceService.getAttendanceRecords().pipe(
    map(recs => {
      const today = new Date().toISOString().split('T')[0];
      return recs.filter(r => r.date === today && r.status === 'Present').length;
    })
  );
  pendingLeaves$ = this.leaveService.getLeaveRequests().pipe(
    map(reqs => reqs.filter(r => r.status === 'Pending').length)
  );

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void { }
}
