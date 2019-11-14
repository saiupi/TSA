import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '../service/http.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offence-type',
  templateUrl: './offence-type.component.html',
  styleUrls: ['./offence-type.component.css']
})
export class OffenceTypeComponent implements OnInit {

  violationTypeForm: FormGroup;
  submitted = false;
  myform: FormGroup;
  errorMsg: any;
  getViolationTypes: Object;
  deleteViolations: any;
  loading = true;


  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private vehicleServices: HttpService,private router:Router) {

  }

  ngOnInit() {


    this.myform = this.formBuilder.group({
      violationTypeId: ['', Validators.required],

      name: ['', Validators.required],


    })
    this.violationTypeForm = this.formBuilder.group({
      name: ['', Validators.required],

    });
    this.violationGet();
   }
   violationGet(){
    return this.vehicleServices.get('/violationType/getViolationTypes').subscribe((res) => {
      
      this.getViolationTypes = res['data'];
      console.log("getViolationTypes", this.getViolationTypes)


    });
   }
  get f() { return this.violationTypeForm.controls; }

  add() {
    this.submitted = true;

    let violationType = {
      name: this.violationTypeForm.controls['name'].value,

    }



    // this.loginService.login(profile).subscribe ((res) => {

    if (this.violationTypeForm.invalid) {
      return;
    }
    this.vehicleServices.post('/violationType/createViolationType',violationType).subscribe((res) => {
      swal.fire('congrats...', 'Issue has been CreateViolationType successfully', 'success');
      this.violationGet();
      console.log("username and password", res);
     


    },
      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error.message); // body
        swal.fire('OPPs...', 'Reward already registered with violationTypeId', 'error');
  
        this.errorMsg =  error.error.message;
        console.log("error", this.errorMsg)
      });
      this.violationTypeForm.reset();
  }
  edit(data) {
    this.myform.patchValue({
      'violationTypeId': data.violationTypeId,
      'name': data.name,

    });
  }
  delete(deleteViolation) {
    this.deleteViolations = deleteViolation;
    console.log("deleteviolations", this.deleteViolations);
    let deleteviolations = {
      'violationTypeId': this.deleteViolations.violationTypeId,
    }
//
    this.http.request('delete','http://192.168.1.55:3055/api/violationType/deleteViolationType',{body:deleteviolations}).subscribe((res) => {
      swal.fire('congrats...', 'Issue has been delete successfully', 'success');
    this.violationGet();
      console.log("username and password", res);
     
      // this.router.navigate(['/dashboard/offence']);
    })

  }
  upDate() {

    if (this.myform.invalid) {
      return;
    }
    this.submitted = true;
    let postViolation = {
      'violationTypeId': this.myform.controls['violationTypeId'].value,
      'name': this.myform.controls['name'].value,
    }
    this.vehicleServices.post('/violationType/updateViolationType',postViolation).subscribe((res) => {
      swal.fire('congrats...', 'Issue has been updated successfully', 'success');
  
      this.violationGet();

      console.log("username and password", res);
    
    });
    
  }

}
