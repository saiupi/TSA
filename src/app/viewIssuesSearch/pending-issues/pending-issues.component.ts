import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HttpService } from 'src/app/service/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderSpinnerService } from 'src/app/service/loader-spinner.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
  reportId:any;
  constructor(private http: HttpClient, private loaderService: LoaderSpinnerService,
    private fb: FormBuilder, private myRoute: Router, private vehicleService: HttpService) {
    this.pendingMethod();
    this.vehicleType();
  }
  readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
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
    this.reportId = data.reportId;
    console.log("reportIddfas",this.reportId);
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

    let adminProfile = {

      // private String mobileNum;
      // private String offenceCategory;
      // private String location;
      // private String status;
      // private String issueDate;
      // private String vehicleType;
      // private byte[] image;

      'reportId': this.myform.controls['reportId'].value,
      'mobileNum': this.myform.controls['mobileNum'].value,
      'offenceCategory': this.myform.controls['offenceCategory'].value,
      'location': this.myform.controls['location'].value,
      'status': this.myform.controls['status'].value,
      'issueDate': this.myform.controls['issueDate'].value,
      'vehicleType': this.myform.controls['vehicleType'].value,
      'image': this.myform.controls['image'].value,
      
      
      

      headers: new HttpHeaders({
        'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '1'
      })
    };
    console.log("dfjafjdsjfja",this.reportId)

    //     this.vehicleService.post('/viewIssue/editReport',adminProfile).subscribe((res) => {

    //  headers: new HttpHeaders({
    //     "Content-Type": "application/json"        
    //   })      

    //       console.log("username and password", res)
    //       alert('SUCCESS!! :-)')



    //       this.myRoute.navigate(["/dashboard"]);
    //     }



    this.http.put('http://192.168.3.211:4000/viewIssue/editReport'+"/"+this.reportId, adminProfile,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(res => {
      // this.vehicleService.post("/viewIssue/editReport",profile).subscribe(resdata => {
      this.updateData = res;

      console.log("edifgsdfgsdfgt", this.updateData);

    },


    )
  }
  get f() { return this.myform.controls; }

  // approveda() {

  //   swal.fire('Oops...', 'Something went wrong!', 'error')
  // }
  // approved() {
  //   swal.fire({
  //     title: 'Are you sure?',
  //     text: '',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, Approved it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.value) {
  //       swal.fire(
  //         'Approved!',
  //         '',
  //         'success'
  //       )

  //     } else if (result.dismiss === swal.DismissReason.cancel) {
  //       swal.fire(
  //         'Cancelled',
  //         'Your imaginary file is safe :)',
  //         'error'
  //       )
  //     }
  //   })
  // }
  // rejected() {
  //   swal.fire({
  //     title: 'Are you sure?',
  //     text: '',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, Rejected it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.value) {
  //       swal.fire(
  //         'rejected!',
  //         '',
  //         'success'
  //       )

  //     } else if (result.dismiss === swal.DismissReason.cancel) {
  //       swal.fire(
  //         'Cancelled',
  //         'Your imaginary file is safe :)',
  //         'error'
  //       )
  //     }
  //   })

  // }
}
