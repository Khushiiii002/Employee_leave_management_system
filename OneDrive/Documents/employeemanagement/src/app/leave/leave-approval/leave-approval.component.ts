import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../core/services/leave.service';
import { LeaveRequest } from '../../models/data.models';

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrl: './leave-approval.component.scss'
})
export class LeaveApprovalComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.leaveService.getLeaveRequests().subscribe(reqs => {
      this.leaveRequests = reqs;
    });
  }

  approve(id: number) {
    const req = this.leaveRequests.find(r => r.id === id);
    if (req) {
      req.status = 'Approved';
      alert(`Leave Request ${id} Approved`);
    }
  }

  reject(id: number) {
    const req = this.leaveRequests.find(r => r.id === id);
    if (req) {
      req.status = 'Rejected';
      alert(`Leave Request ${id} Rejected`);
    }
  }
}
