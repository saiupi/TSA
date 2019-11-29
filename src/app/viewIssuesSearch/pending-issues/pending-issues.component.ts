import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  pendingCont: any;
  changeText: boolean;
  sumbitMessage: any;
  statuss: any;

  constructor(private totalService: HttpService, private formBuilder: FormBuilder, private updateservice: HttpService,
    private http: HttpService) { this.changeText = false; }
  Filter: any = { violationType: '' };
  ngOnInit() {

    this.updateForm = this.formBuilder.group({
      userViolationId: ['', Validators.required],
      // adminId: ['', Validators.required],
      status: ['', Validators.required],
      vehicleType: ['', Validators.required],
      //vehicleNumber: ['', Validators.required],
      vehicleNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}(?:[A-Z])?(?:[A-Z]*)?[0-9]{4}$')]],
    });
    this.getViolation();
    this.id = localStorage.getItem('LoggedInUser');
    console.log("AdminID", this.id);

  }

  getViolation() {
    return this.totalService.get('/violation/getFilteredViolations?status=1000').subscribe((res) => {

      console.log("getallIssue", res)
      this.totalIssues = res['data']
      this.pendingCont = this.totalIssues.length
      console.log("pendig issuessss", this.pendingCont)
      this.loading = false;


    });
  }
  image: any;
  details(data) {
    this.updateForm.patchValue({
      'userViolationId': data.userViolationId,
      'status': data.status,
      'image': data.image,

    });
    this.image = data.image
    console.log("pending images", data.image)
  }



  get f() { return this.updateForm.controls; }


  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {

      return;
    }



    let violationUpdate = {
      adminId: this.id,
      userViolationId: this.updateForm.controls['userViolationId'].value,
      status: this.updateForm.controls['status'].value,
      vehicleType: this.updateForm.controls['vehicleType'].value,
      vehicleNumber: this.updateForm.controls['vehicleNumber'].value,


    }
    this.statuss = this.updateForm.controls['status'].value;

    if (this.statuss == 1000) {
      swal.fire('Oops....', 'Dont try to Update Pending Status', 'error');
      // alert("Dont try to Update Pending Status");
    }
    else {
      //return this.http.post('http://192.168.1.55:3055/api/violation/updateViolationStatus',violationUpdate).subscribe((res) => {

      return this.updateservice.post('/violation/updateViolationStatus', violationUpdate).subscribe((res) => {

        console.log("pending ViolationTypes", res);
        this.sumbitMessage = res['message'];
        console.log("getViolationTypes", this.sumbitMessage);
        this.loading = false;

        swal.fire('', this.sumbitMessage, 'success');
        this.getViolation();
        this.updateForm.reset();
        this.closeModal();

      },
        (error: HttpErrorResponse) => {
          console.log("error responesx", error.error); // body

          this.errorMsg = error.error.message;
          //console.log("error", this.errorMsg);
          swal.fire('Oops....', 'rewards details not found for this violation type', 'error');
        });


    }
  }
  @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  reset() {
    this.submitted = false;
    this.closeModal();
    this.updateForm.reset();
  }
  keyPress(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
