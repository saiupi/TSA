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
  image: any;
  issueDate: any;
  location: any;
  offenceCategory: any;
  reportId: any;
  status: any;
  vehicleType: any;
  constructor(private approvedService: HttpService) { }

  ngOnInit() {
    return this.approvedService.get('/viewIssue/approved').subscribe((res) => {
      this.approvedIssues = res['userReport'];
      console.log("Pending Issue", this.approvedIssues);
      this.loading = false;
    });

  }



  
  details(view) {
    this.fullDetails = view



    this.image = this.fullDetails.image;
    this.issueDate = this.fullDetails.issueDate;
    this.location = this.fullDetails.location;
    this.offenceCategory = this.fullDetails.mobileNum;
    this.offenceCategory = this.fullDetails.offenceCategory;
    this.reportId = this.fullDetails.reportId;
    this.status = this.fullDetails.status;
    this.vehicleType = this.fullDetails.vehicleType;
    console.log("fullinformation", this.vehicleType);



  }
}



