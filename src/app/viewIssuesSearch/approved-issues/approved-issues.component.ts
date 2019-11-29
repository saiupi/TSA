import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-approved-issues',
  templateUrl: './approved-issues.component.html',
  styleUrls: ['./approved-issues.component.css']
})
export class ApprovedIssuesComponent implements OnInit {
  p: number = 1;
  approvedIssues: any;
  fullDetails: any;
  loading = true;
  approvedCont: any;
  Filter: any = { violationType: '' };
  constructor(private approvedService: HttpService,private filterPipe: FilterPipe ) { }

  ngOnInit() {
    return this.approvedService.get('/violation/getFilteredViolations?status=1001').subscribe((res) => {
      this.approvedIssues = res['data'];
      this.approvedCont = this.approvedIssues.length
      console.log("approved Issue", this.approvedIssues);
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
    console.log("approved modal window", this.image)
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





