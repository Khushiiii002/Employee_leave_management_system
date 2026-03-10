import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../models/data.models';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
    employeeForm: FormGroup;
    isEditMode = false;
    employeeId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.employeeForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            department: ['', Validators.required],
            designation: ['', Validators.required],
            joiningDate: [new Date(), Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.employeeId = +params['id'];
                this.loadEmployee(this.employeeId);
            }
        });
    }

    loadEmployee(id: number) {
        this.employeeService.getEmployees().subscribe(employees => {
            const employee = employees.find(e => e.id === id);
            if (employee) {
                this.employeeForm.patchValue(employee);
            }
        });
    }

    onSubmit() {
        if (this.employeeForm.valid) {
            const employeeData: Employee = {
                ...this.employeeForm.value,
                id: this.employeeId ? this.employeeId : Math.floor(Math.random() * 1000)
            };

            if (this.isEditMode) {
                this.employeeService.updateEmployee(employeeData).subscribe(() => {
                    this.router.navigate(['/employee']);
                });
            } else {
                this.employeeService.addEmployee(employeeData).subscribe(() => {
                    this.router.navigate(['/employee']);
                });
            }
        }
    }
}
