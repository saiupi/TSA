import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../service/http.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { flatten } from '@angular/compiler';


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
  updateForm: FormGroup;
  submitted = false;
  errorMsg: any;
  getViolationTypes: any;
  getBaseRewards: any;
  dd: any;
  violationId: any;
  order: any;
  myform: FormGroup;
  sumbitMessage: any;
  deleteMessage: any;
  updateMessage: any;
  loading = true;
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
      console.log("getViolationTypes", this.getViolationTypes);
      this.loading = false;

    });
  }
  getRewards() {
    return this.vechicleService.get('/rewards/getBaseRewards').subscribe((res) => {
      this.getBaseRewards = res['data'];
      console.log("getBaseRewards", this.getBaseRewards)

    });
  }
  violationname: any;

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

    this.vechicleService.post('/rewards/createRewardPoint',violationUpdate).subscribe((res) => {

      console.log("getViolationTypesdfasf", res);
      this.sumbitMessage = res['message'];
      swal.fire('congrats...', this.sumbitMessage, 'success');

      this.getRewards();


    },

      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error.message); // body

        this.errorMsg = error.error.message;
        console.log("error", this.errorMsg);
        swal.fire('Oops...', this.errorMsg, 'error');

      })
    //this.updateForm.reset();

  }


  deleteRewardPont: any;
  delete(deleteRewardPonts) {
    this.deleteRewardPont = deleteRewardPonts;
    console.log("deleteviolations", this.deleteRewardPont);
    let deleteReward = {
      'rewardId': this.deleteRewardPont.rewardId,
    }

    this.http.request('delete', 'http://192.168.1.55:3055/api/rewards/deleteBaseReward', { body: deleteReward }).subscribe((res) => {

      this.deleteMessage = res['message'];
      swal.fire('Deleted !...', this.deleteMessage, 'success');
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

  upDate() {

    this.submitted = true;
    let postViolation = {
      'points': this.myform.controls['points'].value,
      'rewardId': this.myform.controls['rewardId'].value,
    }
    this.vechicleService.post('/rewards/updateBaseRewards', postViolation).subscribe((res) => {
      this.updateMessage = res['message'];
      swal.fire('congrats...', this.updateMessage, 'success');

      this.getRewards();

      console.log("updated", res);

    });
    this.submitted = false;
    this.myform.reset();
    this.closeModal();

  }
  @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  reset(){

    this.updateForm.reset();
    // this.submitted = false;

  }

  
  
}
