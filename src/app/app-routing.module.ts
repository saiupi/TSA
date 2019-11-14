import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthcationGuard } from './authcation.guard';
import { ServerNotFoundComponent } from './server-not-found/server-not-found.component';
import { ListOfIssuesComponent } from './dashboard/list-of-issues/list-of-issues.component';
import { ApprovedIssuesComponent } from './viewIssuesSearch/approved-issues/approved-issues.component';
import { PendingIssuesComponent } from './viewIssuesSearch/pending-issues/pending-issues.component';
import { RejectedIssuesComponent } from './viewIssuesSearch/rejected-issues/rejected-issues.component';
import { TotalNumberIssuesComponent } from './viewIssuesSearch/total-number-issues/total-number-issues.component';
import { OffenceTypeComponent } from './violation-type/offence-type.component';
import { VehicleTypeComponent } from './create-reward-points/vehicle-type.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'reg', component: RegisterComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthcationGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthcationGuard] ,children: [     
    { path: '', component: PendingIssuesComponent },
 { path: 'totalIssues', component: TotalNumberIssuesComponent },
  { path: 'approved', component: ApprovedIssuesComponent },
  { path: 'pending', component: PendingIssuesComponent },
  { path: 'rejected', component: RejectedIssuesComponent },
  { path: 'offence', component: OffenceTypeComponent },
  { path: 'vehicle', component: VehicleTypeComponent },]},
  { path: 'issues', component: ListOfIssuesComponent },
 
  { path: '**', component: ServerNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
