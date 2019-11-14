import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HttpService } from 'src/app/service/http.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoaderSpinnerService } from 'src/app/service/loader-spinner.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-issues',
  templateUrl: './pending-issues.component.html',
  styleUrls: ['./pending-issues.component.css']
})
export class PendingIssuesComponent implements OnInit {
  totalIssues: any;
  fullDetails: any;
  p: number = 1;
  loading = true;
  updateForm: FormGroup;
  submitted = false;
  errorMsg: any;
  id: string;
  totalCont: any;
  pendingCont:any;
  constructor(private totalService: HttpService,private formBuilder:FormBuilder,private updateservice:HttpService,
  private http :HttpService) { }

  ngOnInit() {

    this.updateForm = this.formBuilder.group({
      userViolationId: ['', Validators.required],
      // adminId: ['', Validators.required],
      status: ['', Validators.required],
    });
     this. getViolation();
     this.id = localStorage.getItem('LoggedInUser');
     console.log("AdminID",this.id);

  }


  getViolation(){



    return this.totalService.get('/violation/getFilteredViolations?status=1000').subscribe((res) => {

      console.log("getallIssue", res)
      this.totalIssues = res['data']
      this.pendingCont=this.totalIssues.length
      console.log("jdjfajfkjdfskajfdas",this.pendingCont)
      this.loading = false;


    });
  }
  details(data) {
    
    this.updateForm.patchValue({
      'userViolationId': data.userViolationId,
      'status': data.status,
       'image':data.image,

    });
    console.log("total number of issues",data)
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }



    let violationUpdate = {
      adminId:this.id,
      userViolationId: this.updateForm.controls['userViolationId'].value,
      status: this.updateForm.controls['status'].value,
      //adminId: this.updateForm.controls['adminId'].value,

    }

    //return this.http.post('http://192.168.1.55:3055/api/violation/updateViolationStatus',violationUpdate).subscribe((res) => {

    return this.updateservice.post('/violation/updateViolationStatus',violationUpdate).subscribe((res) => {

      console.log("getViolationTypes", res);
      this.loading = false;

      swal.fire('congrats...', 'Issue has been delete successfully', 'success');
      this. getViolation();
      this.updateForm.reset();
    },
      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error); // body

        this.errorMsg = error.error.message;
        console.log("error", this.errorMsg);
        //swal.fire('congrats...', 'Issue has been delete successfully', 'error');
      });


  }


}
