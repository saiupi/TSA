import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignIn } from '../sign-in';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../service/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMsg: any;

  constructor(private formBuilder: FormBuilder, private myRoute: Router, private auth: AuthService
    , private loginServices: HttpService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    let adminProfile = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,

    }



    // this.loginService.login(profile).subscribe ((res) => {

    if (this.loginForm.invalid) {
      return;
    }
    this.loginServices.post('/userDetails/adminLogin',adminProfile).subscribe((res) => {

      console.log("username and password", res)
      this.auth.sendToken(this.loginForm.value.username)
      this.myRoute.navigate(["/dashboard"]);
      alert('SUCCESS!! :-)')
    },
      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error); // body

        this.errorMsg = error.error.message;
        console.log("error",this.errorMsg)
      });
  }


}
