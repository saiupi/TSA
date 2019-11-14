import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

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
  approvedCont:any;
  
  constructor(private approvedService: HttpService) { }

  ngOnInit() {
    return this.approvedService.get('/violation/getFilteredViolations?status=1001').subscribe((res) => {
      this.approvedIssues = res['data'];
      this.approvedCont=this.approvedIssues.length
      console.log("approved Issue", this.approvedIssues);
      this.loading = false;
    });

  }




  details(view) {




  }
}



