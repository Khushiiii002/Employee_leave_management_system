import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceTrackerComponent } from './attendance-tracker/attendance-tracker.component';

const routes: Routes = [
  { path: '', component: AttendanceTrackerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
