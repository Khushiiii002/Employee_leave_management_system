import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../../models/data.models';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private mockEmployees: Employee[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            department: 'IT',
            designation: 'Developer',
            joiningDate: '2023-01-15',
            isActive: true
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '0987654321',
            department: 'HR',
            designation: 'Manager',
            joiningDate: '2022-05-20',
            isActive: true
        },
        {
            id: 3,
            name: 'Alice Johnson',
            email: 'alice@example.com',
            phone: '1122334455',
            department: 'Sales',
            designation: 'Executive',
            joiningDate: '2023-03-10',
            isActive: false
        }
    ];

    getEmployees(): Observable<Employee[]> {
        return of(this.mockEmployees);
    }

    getEmployeeById(id: number): Observable<Employee | undefined> {
        const employee = this.mockEmployees.find(e => e.id === id);
        return of(employee);
    }

    addEmployee(employee: Employee): Observable<void> {
        this.mockEmployees.push(employee);
        return of(undefined);
    }

    updateEmployee(employee: Employee): Observable<void> {
        const index = this.mockEmployees.findIndex(e => e.id === employee.id);
        if (index !== -1) {
            this.mockEmployees[index] = employee;
        }
        return of(undefined);
    }

    deleteEmployee(id: number): Observable<void> {
        this.mockEmployees = this.mockEmployees.filter(e => e.id !== id);
        return of(undefined);
    }
}
