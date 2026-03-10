import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';

const routes: Routes = [
  { path: 'request', component: LeaveRequestComponent },
  { path: 'approval', component: LeaveApprovalComponent },
  { path: '', redirectTo: 'request', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
