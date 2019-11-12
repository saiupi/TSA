import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';


@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {
  // getViolationTypes: any;
  // selectedProduct: any;
  // empSelected: number;

  // constructor(private formBuilder: FormBuilder, private vechicleService: HttpService, private http: HttpClient) { }


  // ngOnInit() {
  //   this.empSelected

  //   return this.vechicleService.get('/violationType/getViolationTypes').subscribe((res) => {
  //     this.getViolationTypes = res['data'];
  //     console.log("getViolationTypes", this.getViolationTypes)


  //   });


  // }

  levels:Array<Object> = [
      {num: 0, name: ""},
      {num: 1, name: ""}
  ];

  selectedLevel = this.levels[0];



  // -----------------------------------------------------------
  updateForm: FormGroup;
  submitted = false;
  errorMsg: any;
  getViolationTypes: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private vechicleService: HttpService) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      violationType: ['', Validators.required],
      violationTypeId: ['', Validators.required],
      points: ['', Validators.required],
    });
    return this.vechicleService.get('/violationType/getViolationTypes').subscribe((res) => {
      this.getViolationTypes = res['data'];
      console.log("getViolationTypes", this.getViolationTypes)

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }
    let violationUpdate = {
      violationType: this.updateForm.controls['violationType'].value,
      violationTypeId: this.updateForm.controls['violationTypeId'].value,
      points: this.updateForm.controls['points'].value,

    }

    return this.http.post('http://192.168.1.55:3055/api/rewards/createRewardPoint', violationUpdate).subscribe((res) => {

      console.log("getViolationTypes", res);
      swal.fire('congrats...', 'Issue has been delete successfully', 'success');

      this.updateForm.reset();
    },
      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error.message); // body

        this.errorMsg = error.error.message;
        console.log("error", this.errorMsg);
        //swal.fire('congrats...', 'Issue has been delete successfully', 'error');
      });


  }

  onReset() {
    this.submitted = false;

  }




}
