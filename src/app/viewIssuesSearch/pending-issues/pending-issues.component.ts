import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HttpService } from 'src/app/service/http.service';
import { HttpClient } from '@angular/common/http';
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
 

  constructor(private pendingService: HttpClient, private loaderService: LoaderSpinnerService, private fb: FormBuilder) {

  }

  ngOnInit() {

    this.myform = this.fb.group({
      reportId: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      offenceCategory: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required],
      issueDate: ['', Validators.required],
    
    })




    return this.pendingService.get('http://192.168.3.211:4000/viewIssue/pending').subscribe((res) => {
      this.pendingIssues = res['userReport']
      console.log("Pending Issue", res)

    });


  }

  updateEvent(data) {
    console.log(data);
    this.myform.patchValue({
      'reportId': data.reportId,
      'mobileNumber': data.mobileNumber,
      'offenceCategory': data.offenceCategory,
      'location': data.location,
      'status': data.status,
      'issueDate': data.issueDate,
      'imageName': data.imagename,
      'image'  :data.image,

    });

    this.images = data.image
  }
  saveViewIssues(data) {
    console.log(data);
    this.myform.setValue({

      'reportId': data.reportId,
      'mobileNumber': data.mobileNumber,
      'offenceCategory': data.offenceCategory,
      'vehicleType': data.vehicleType,
      'vehicleNumber': data.vehicleNumber,
      'location': data.location,
      'status': data.status,
      'issueDate': data.issueDate,
      'image'  :data.image,
      
    });

    this.pendingService.post("http://192.168.3.211:4000/viewIssue/editReport",data).subscribe(resdata => {
      this.updateData = resdata; 
    
      console.log("edit", this.updateData);
     
    },


    )
  }
  

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
