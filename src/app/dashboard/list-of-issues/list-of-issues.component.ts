import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-list-of-issues',
  templateUrl: './list-of-issues.component.html',
  styleUrls: ['./list-of-issues.component.css']
})
export class ListOfIssuesComponent implements OnInit {
  totalCount:string;
  approvedCounts:any;
  counts;
 name:string="sai";

  constructor(private router: Router,private totalNumService:HttpService) {
    this.totalcount()
   }

  ngOnInit() {
    
   this.approvedcount()
    }
    totalcount(){
      return this.totalNumService.get('/viewIssue/totalCount').subscribe((res) => {
        this.totalCount = res['reportList'];
        //this.counts=this.totalCount.count 
         console.log("totalcount",this.totalCount)
   
       });
    }
   approvedcount(){
      return this.totalNumService.get('/viewIssue/approvedCount').subscribe((res) => {
        this.approvedCounts = res['reportList'].count;
        //this.counts=this.totalCount.count 
         console.log("approvedCounts",this.approvedCounts)
   
       });
    }
  totalIssue(){
    this.router.navigate(["/totalIssues"]);
  }
  approvedIssue(){
    this.router.navigate(["/approved"]);

  }
  pendingIssue(){
    this.router.navigate(["/Inventory"]);

  }
  rejected(){
  this.router.navigate(["approved"]);

 }
}
