import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

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
  constructor(private rejectedService: HttpService) { }

  ngOnInit() {
    return this.rejectedService.get('/viewIssue/rejected').subscribe((res) => {
     this.rejectedIssues = res['userReport']
      console.log("rejected Issue",this.rejectedIssues)
      this.loading = false;
    });

  }
  details(modalDispaly) {
    this.fullDetails = modalDispaly

  }

}
