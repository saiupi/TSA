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
  fullDetails:any;
  constructor(private approvedService: HttpService) { }

  ngOnInit() {
    return this.approvedService.get('/viewIssue/approved').subscribe((res) => {
     this.approvedIssues = res['userReport']
      console.log("Pending Issue",this.approvedIssues)

    });

  }
  details(modalDispaly) {
    this.fullDetails = modalDispaly

  }
}
  


