import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../models/data.models';

@Pipe({
  name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: Employee[], department: string, activeStatus: string): Employee[] {
    if (!employees) return [];

    let filtered = [...employees];

    if (department && department !== 'All') {
      filtered = filtered.filter(e => e.department === department);
    }

    if (activeStatus === 'Active') {
      filtered = filtered.filter(e => e.isActive);
    } else if (activeStatus === 'Inactive') {
      filtered = filtered.filter(e => !e.isActive);
    }

    return filtered;
  }
}
