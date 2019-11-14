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
  selectedLevels:any;
  levels: Array<Object> = [
    { num: 0, name: "" },
    { num: 1, name: "" }
  ];

  selectedLevel = this.levels[0];



  // -----------------------------------------------------------
  updateForm: FormGroup;
  submitted = false;
  errorMsg: any;
  getViolationTypes: any;
  getBaseRewards: any;
  dd: any;
  violationId: any;
  order: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private vechicleService: HttpService) { }

  ngOnInit() {
    this.getRewards();
    this.getViolation();
    this.updateForm = this.formBuilder.group({
      violationType: ['', Validators.required],
      violationTypeId: ['', Validators.required],
      points: ['', Validators.required],
    });
   
    
  }
  getViolation() {
    return this.vechicleService.get('/violationType/getViolationTypes').subscribe((res) => {
      this.getViolationTypes = res['data'];
      console.log("getViolationTypes", this.getViolationTypes)

    });

  }
  getRewards(){
    return this.vechicleService.get('/rewards/getBaseRewards').subscribe((res) => {
      this.getBaseRewards = res['data'];
      console.log("getBaseRewards", this.getBaseRewards)

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

    return this.vechicleService.post('/rewards/createRewardPoint',violationUpdate).subscribe((res) => {

      console.log("getViolationTypesdfasf",res);
      swal.fire('congrats...', 'violation UpdateiolationUpdatee successfully', 'success');
      this.getRewards();
      this.updateForm.reset();
    },
      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error.message); // body

        this.errorMsg = error.error.message;
        console.log("error", this.errorMsg);
        swal.fire('Error...', 'Reward already registered', 'error');
      });


  }

  onReset() {
    this.submitted = false;

  }
  

 
 
//   <!-- <select (change)="onChange($event.target.value)" formControlName="violationType">
//   <option *ngFor="let i of getViolationTypes"  [value]="i.name">
//       {{i.name}}</option>
// </select> -->
callType(value){
  console.log("dfasfjdjf",value);
  this.order.type=value;
  console.log("dfasfjdjfdfasfd", this.order.type);
}
}
