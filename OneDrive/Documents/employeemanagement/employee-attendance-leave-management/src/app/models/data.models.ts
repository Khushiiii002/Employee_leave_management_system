export interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    joiningDate: string;
    isActive: boolean;
}

export interface AttendanceRecord {
    id: number;
    employeeId: number;
    date: string;
    status: 'Present' | 'Absent' | 'Late' | 'Leave';
}

export interface LeaveRequest {
    id: number;
    employeeId: number;
    startDate: string;
    endDate: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}
