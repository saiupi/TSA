import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HttpService } from 'src/app/service/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderSpinnerService } from 'src/app/service/loader-spinner.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pending-issues',
  templateUrl: './pending-issues.component.html',
  styleUrls: ['./pending-issues.component.css']
})
export class PendingIssuesComponent implements OnInit {
  p: number = 1;
  pendingIssues: any;
  fullDetails: any;
  myform: FormGroup;
  images: any;
  updateData: Object;
  loading = true;
  mobileNum: any;
  vehicleTypes: any;
  submitted: boolean;
  constructor(private pendingService: HttpClient, private loaderService: LoaderSpinnerService,
    private fb: FormBuilder, private vehicleService: HttpService) {
    this.pendingMethod();
    this.vehicleType();
  }

  ngOnInit() {

    this.myform = this.fb.group({
      reportId: ['', Validators.required],
      mobileNum: ['', Validators.required],
      offenceCategory: ['', Validators.required],
      vehicleType: ['', Validators.required],
      image: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required],
      issueDate: ['', Validators.required],

    })



  }

  vehicleType() {
    return this.vehicleService.get('/vehicle/getAll').subscribe((res) => {
      this.vehicleTypes = res['vehicleType'];

      // this.loading = false;
      console.log("vehicleTypesssss", this.vehicleTypes);

    });
  }
  pendingMethod() {
    return this.vehicleService.get('/viewIssue/pending').subscribe((res) => {
      this.pendingIssues = res['userReport'];
      this.loading = false;
      console.log("Pending Issue", res)

    });
  }

  updateEvent(data) {

    this.myform.patchValue({
      'reportId': data.reportId,
      'mobileNum': data.mobileNum,
      'offenceCategory': data.offenceCategory,
      'location': data.location,
      'status': data.status,
      'issueDate': data.issueDate,
      'imageName': data.imagename,
      'image': data.image,


    });
    console.log("myformdata", data);
    this.images = data.image;
    this.mobileNum = data.mobileNum;
  }
  saveView() {
    // console.log(data);
    // this.myform.setValue({

    //   'reportId': data.reportId,
    //   'mobileNum': data.mobileNum,
    //   'offenceCategory': data.offenceCategory,
    //   'vehicleType': data.vehicleType,

    //   'location': data.location,
    //   'status': data.status,
    //   'issueDate': data.issueDate,
    //   'image': data.image,

    // });
    this.submitted = true;

    let profile = {

     

      reportId: this.myform.controls['reportId'].value,
      mobileNum: this.myform.controls['mobileNum'].value,
      offenceCategory: this.myform.controls['offenceCategory'].value,
      vehicleType: this.myform.controls['vehicleType'].value,
      image: this.myform.controls['image'].value,
      location: this.myform.controls['location'].value,
      status: this.myform.controls['status'].value,
      issueDate: this.myform.controls['issueDate'].value,

      headers: new HttpHeaders({
        'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
      })
    };
    console.log("dfjafjdsjfja",profile)

    this.vehicleService.post("/viewIssue/editReport",profile).subscribe(resdata => {
      this.updateData = resdata;

      console.log("edifgsdfgsdfgt",this.updateData);

    },


    )
  }
  get f() { return this.myform.controls; }

  approveda() {

    swal.fire('Oops...', 'Something went wrong!', 'error')
  }
  approved() {
    swal.fire({
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approved it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Approved!',
          '',
          'success'
        )

      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  rejected() {
    swal.fire({
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Rejected it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'rejected!',
          '',
          'success'
        )

      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }
}
