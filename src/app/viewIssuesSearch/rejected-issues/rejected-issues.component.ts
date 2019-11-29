import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rejected-issues',
  templateUrl: './rejected-issues.component.html',
  styleUrls: ['./rejected-issues.component.css']
})
export class RejectedIssuesComponent implements OnInit {
  p: number = 1;
  rejectedIssues: any;
  fullDetails: any;
  loading = true;
  updateForm: FormGroup;
  rejectedCont: any;
  constructor(private rejectedService: HttpService, private formBuilder: FormBuilder) { }
  Filter: any = { violationType: '' };
  ngOnInit() {

    this.updateForm = this.formBuilder.group({
      userViolationId: ['', Validators.required],
      // adminId: ['', Validators.required],
      status: ['', Validators.required],
    });
    return this.rejectedService.get('/violation/getFilteredViolations?status=1002').subscribe((res) => {
      this.rejectedIssues = res['data'];
      console.log("rejected Issue", this.rejectedIssues);
      this.rejectedCont = this.rejectedIssues.length;
      console.log("rejected count", this.rejectedCont);
      this.loading = false;
    });

  }
  image: any
  details(data) {
    
    // this.updateForm.patchValue({
    //   'userViolationId': data.userViolationId,
    //   'status': data.status,
    //    'image':data.image,

    // });
    this.image=data.image
    console.log("rejectmodeal window", this.image);
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