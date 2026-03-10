import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeaveRequest } from '../../models/data.models';

@Injectable({
    providedIn: 'root'
})
export class LeaveService {
    private mockLeaveRequests: LeaveRequest[] = [
        { id: 1, employeeId: 1, startDate: '2023-11-01', endDate: '2023-11-03', reason: 'Sick Leave', status: 'Pending' },
        { id: 2, employeeId: 3, startDate: '2023-10-20', endDate: '2023-10-22', reason: 'Vacation', status: 'Approved' }
    ];

    getLeaveRequests(): Observable<LeaveRequest[]> {
        return of(this.mockLeaveRequests);
    }

    addLeaveRequest(request: LeaveRequest): Observable<LeaveRequest> {
        // Simulate ID generation
        const newRequest = { ...request, id: this.mockLeaveRequests.length + 1 };
        this.mockLeaveRequests.push(newRequest);
        return of(newRequest);
    }
}
