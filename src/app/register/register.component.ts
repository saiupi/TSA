import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  submitted: boolean;
  loginId: any;
  errorMsg: any;

  constructor(private formBuilder: FormBuilder, private route: Router, private auth: AuthService
    , private loginServices: HttpService) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.regForm.controls; }

  onSubmit() {
    this.submitted = true;

    let adminProfile = {
      username: this.regForm.controls['username'].value,
      password: this.regForm.controls['password'].value,

    }



    // this.loginService.login(profile).subscribe ((res) => {

    if (this.regForm.invalid) {
      return;
    }
    this.loginServices.post('/admin/register',adminProfile).subscribe((res) => {

      console.log("username and password", res)
      this.loginId=res['data']._id;
         
      console.log("results",this.loginId)
      this.auth.sendToken(this.loginId)
      this.route.navigate(["/dashboard"]);
      alert('SUCCESS!! :-)')
    },
      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error); // body

        this.errorMsg = error.error.message;
        console.log("error",this.errorMsg)
      });
  }

  register(){
    this.route.navigate(["/login"]);
  }

}
