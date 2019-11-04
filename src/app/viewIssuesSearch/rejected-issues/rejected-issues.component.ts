import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-rejected-issues',
  templateUrl: './rejected-issues.component.html',
  styleUrls: ['./rejected-issues.component.css']
})
export class RejectedIssuesComponent implements OnInit {

  rejectedIssues: any;
  fullDetails:any;
  constructor(private rejectedService: HttpService) { }

  ngOnInit() {
    return this.rejectedService.get('/viewIssue/rejected').subscribe((res) => {
     this.rejectedIssues = res
      console.log("Pending Issue",this.rejectedIssues)

    });

  }
  details(modalDispaly) {
    this.fullDetails = modalDispaly

  }

}
