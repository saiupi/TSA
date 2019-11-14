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
  fullDetails:any;
  loading = true;
  updateForm:FormGroup;
  rejectedCont:any;
  constructor(private rejectedService: HttpService,private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.updateForm = this.formBuilder.group({
      userViolationId: ['', Validators.required],
      // adminId: ['', Validators.required],
      status: ['', Validators.required],
    });
    return this.rejectedService.get('/violation/getFilteredViolations?status=1002').subscribe((res) => {
     this.rejectedIssues = res['data'];
     this.rejectedCont=this.rejectedIssues.length
      console.log("rejected Issue",this.rejectedCont)
      this.loading = false;
    });

  }
  rejectedisuuess:any
  rejecteddetails(data) {
    this.rejectedisuuess=data
    // this.updateForm.patchValue({
    //   'userViolationId': data.userViolationId,
    //   'status': data.status,
    //    'image':data.image,

    // });
    // console.log("rejectmodeal window",data)
}
}