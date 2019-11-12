import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthcationGuard } from './authcation.guard';
import { ServerNotFoundComponent } from './server-not-found/server-not-found.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SlideMenuComponent } from './dashboard/slide-menu/slide-menu.component';
import { ListOfIssuesComponent } from './dashboard/list-of-issues/list-of-issues.component';
import { ViewIssuesSearchComponent } from './dashboard/view-issues-search/view-issues-search.component';
import { TotalNumberIssuesComponent } from './viewIssuesSearch/total-number-issues/total-number-issues.component';
import { ApprovedIssuesComponent } from './viewIssuesSearch/approved-issues/approved-issues.component';
import { PendingIssuesComponent } from './viewIssuesSearch/pending-issues/pending-issues.component';
import { RejectedIssuesComponent } from './viewIssuesSearch/rejected-issues/rejected-issues.component';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './pipe/filter.pipe';
import { VehicleTypeComponent } from './create-reward-points/vehicle-type.component';
import { OffenceTypeComponent } from './offence-type/offence-type.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ServerNotFoundComponent,
    HeaderComponent,
    SlideMenuComponent,
    ListOfIssuesComponent,
    ViewIssuesSearchComponent,
    TotalNumberIssuesComponent,
    ApprovedIssuesComponent,
    PendingIssuesComponent,
    RejectedIssuesComponent,
    FilterPipe,
    VehicleTypeComponent,
    OffenceTypeComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    NgxPaginationModule,
    Ng2SearchPipeModule 
  ],
  //providers: [AuthcationGuard],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
