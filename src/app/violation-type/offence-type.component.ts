import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  deleteMessage: any;
  mes: any;
  updateMessage: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private vehicleServices: HttpService, private router: Router) {

  }

  ngOnInit() {


    this.myform = this.formBuilder.group({
      violationTypeId: ['', Validators.required],

      name: ['', Validators.required],
      //  name: ['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],


    })
    this.violationTypeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],

      //name: ['', Validators.required]

    });
    this.violationGet();
  }
  violationGet() {
    return this.vehicleServices.get('/violationType/getViolationTypes').subscribe((res) => {

      this.getViolationTypes = res['data'];
      console.log("getViolationTypes", this.getViolationTypes);
      this.loading = false;



    });
  }
  get f() { return this.violationTypeForm.controls; }

  onSubmit() {

    this.submitted = true;

    let violationType = {
      name: this.violationTypeForm.controls['name'].value,

    }

    if (this.violationTypeForm.invalid) {
      return;
    }
    this.vehicleServices.post('/violationType/createViolationType', violationType).subscribe((res) => {
      this.mes = res['message'];

      this.violationGet();
      console.log("Violation Type ", this.mes);
      swal.fire('congrats...', this.mes, 'success');

    },
      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error.message); // body
        swal.fire('Oops...', 'Reward already registered with violationType', 'error');

        this.errorMsg = error.error.message;
        console.log("error", this.errorMsg)
      });
    this.submitted = false;
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
    this.http.request('delete', 'http://192.168.1.55:3055/api/violationType/deleteViolationType', { body: deleteviolations }).subscribe((res) => {
      this.deleteMessage = res['message'];
      this.violationGet();
      console.log("Delete", this.deleteMessage);
      swal.fire('Deleted!', this.deleteMessage, 'success');

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
    this.vehicleServices.post('/violationType/updateViolationType', postViolation).subscribe((res) => {

      this.updateMessage = res['message'];
      swal.fire('congrats...', this.updateMessage, 'success');

      this.violationGet();

      console.log("Updated", res);

    });
    this.submitted = false;

    this.myform.reset();
    this.closeModal();
  }
  @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
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
