import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AttendanceRecord } from '../../models/data.models';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    private mockAttendance: AttendanceRecord[] = [
        { id: 1, employeeId: 1, date: '2023-10-26', status: 'Present' },
        { id: 2, employeeId: 2, date: '2023-10-26', status: 'Present' },
        { id: 3, employeeId: 3, date: '2023-10-26', status: 'Absent' },
        { id: 4, employeeId: 1, date: '2023-10-25', status: 'Late' }
    ];

    getAttendanceRecords(): Observable<AttendanceRecord[]> {
        return of(this.mockAttendance);
    }

    getAttendanceByEmployee(employeeId: number): Observable<AttendanceRecord[]> {
        const records = this.mockAttendance.filter(a => a.employeeId === employeeId);
        return of(records);
    }

    addAttendance(record: AttendanceRecord): Observable<void> {
        this.mockAttendance.push(record);
        return of(undefined);
    }
}
