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

  selectedLevels: any;
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
  myform: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private vechicleService: HttpService) { }

  ngOnInit() {
    this.getRewards();
    this.getViolation();
    this.updateForm = this.formBuilder.group({
      violationType: ['', Validators.required],
      violationTypeId: ['', Validators.required],
      points: ['', Validators.required],
    });
    this.myform = this.formBuilder.group({
      points: ['', Validators.required],

      rewardId: ['', Validators.required],


    })

  }
  getViolation() {
    return this.vechicleService.get('/violationType/getViolationTypes').subscribe((res) => {
      this.getViolationTypes = res['data'];
      console.log("getViolationTypes", this.getViolationTypes)

    });
  }
  getRewards() {
    return this.vechicleService.get('/rewards/getBaseRewards').subscribe((res) => {
      this.getBaseRewards = res['data'];
      console.log("getBaseRewards", this.getBaseRewards)

    });
  }
  violationname: any;
  trackByFn(index, item) {
    this.violationname = item.name
    console.log(item.name);
    return item.name;

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
      // violationType: this.violationname,
      violationType: this.updateForm.controls['violationType'].value.name,
      violationTypeId: this.updateForm.controls['violationTypeId'].value,
      points: this.updateForm.controls['points'].value,

    }

    return this.vechicleService.post('/rewards/createRewardPoint', violationUpdate).subscribe((res) => {

      console.log("getViolationTypesdfasf", res);
      swal.fire('congrats...', 'violation UpdateiolationUpdatee successfully', 'success');
      this.getRewards();
      this.updateForm.reset();
    },

      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error.message); // body
  swal.fire('Opps...', `this.errorMsg`, 'error');

        this.errorMsg = error.error.message;
        console.log("error", this.errorMsg)
      });


  }

  // onReset() {
  //   this.submitted = false;
  //    this.updateForm.reset();


  // }
  deleteRewardPont: any;
  delete(deleteRewardPonts) {
    this.deleteRewardPont = deleteRewardPonts;
    console.log("deleteviolations", this.deleteRewardPont);
    let deleteReward = {
      'rewardId': this.deleteRewardPont.rewardId,
    }

    this.http.request('delete', 'http://192.168.1.55:3055/api/rewards/deleteBaseReward', { body: deleteReward }).subscribe((res) => {
      swal.fire('congrats...', 'Issue has been delete successfully', 'success');
      this.getRewards();
      console.log("DeleteViolations", res);
    });
  }

  edit(data) {
    this.myform.patchValue({
      'points': data.points,
      'rewardId': data.rewardId,

    });
  }


//   submit() {
// debugger;

//     if (this.myform.invalid) {
//       return;
//     }
//     let rewardPoints = {
//       'points': this.myform.controls['points'].value,
//       'rewardId': this.myform.controls['rewardId'].value,
//     }
//     this.vechicleService.post('rewards/updateBaseRewards',rewardPoints).subscribe((res) => {
//       swal.fire('congrats...', 'Issue has been updated successfully', 'success');

//       this.getRewards();

//       console.log("username and password", res);

//     });

//   }
upDate() {

  this.submitted = true;
  let postViolation = {
    'points': this.myform.controls['points'].value,
    'rewardId': this.myform.controls['rewardId'].value,
  }
  this.vechicleService.post('/rewards/updateBaseRewards',postViolation).subscribe((res) => {
    swal.fire('congrats...', 'Issue has been updated successfully', 'success');

    this.getRewards();

    console.log("username and password", res);
  
  });
  
}


}
