import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-list-of-issues',
  templateUrl: './list-of-issues.component.html',
  styleUrls: ['./list-of-issues.component.css']
})
export class ListOfIssuesComponent implements OnInit {
  totalCount: any;;
  approvedCounts: any;
  pendingCounts: any;
  rejectedCounts: any;
  counts;


  constructor(private router: Router, private totalNumService: HttpService) {

  }

  ngOnInit() {
    this.totalcount();
    this.approvedcount();
    this.pendingcount();
    this.rejectedcount();


  }
  totalcount() {
    return this.totalNumService.get('/viewIssue/totalCount').subscribe((res) => {
      this.totalCount = res['reportList'];
      //this.counts=this.totalCount.count 
      console.log("totalcount", this.totalCount)

    });
  }
  approvedcount() {
    return this.totalNumService.get('/viewIssue/approvedCount').subscribe((res) => {
      this.approvedCounts = res['reportList'].count;
      //this.counts=this.totalCount.count 
      console.log("approvedCounts", this.approvedCounts)

    });
  }
  pendingcount() {
    return this.totalNumService.get('/viewIssue/pendingCount').subscribe((res) => {
      this.pendingCounts = res['reportList'].count;
      //this.counts=this.totalCount.count 
      console.log("pendingCount", this.pendingCounts)

    });
  }
  rejectedcount() {
    return this.totalNumService.get('/viewIssue/rejectedCount').subscribe((res) => {
      this.rejectedCounts = res['reportList'].count;
      //this.counts=this.totalCount.count 
      console.log("rejectedCount", this.rejectedCounts)

    });
  }
  totalIssue() {
    this.router.navigate(["/totalIssues"]);
  }
  approvedIssue() {
    this.router.navigate(["/approved"]);

  }
  pendingIssue() {
    this.router.navigate(["/Inventory"]);

  }
  rejected() {
    this.router.navigate(["approved"]);

  }
}
