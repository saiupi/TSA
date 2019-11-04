import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-total-number-issues',
  templateUrl: './total-number-issues.component.html',
  styleUrls: ['./total-number-issues.component.css']
})
export class TotalNumberIssuesComponent implements OnInit {
  totalIssues:any;
  fullDetails:any;
  constructor(private totalService:HttpService) { }

  ngOnInit() {

    return this.totalService.get('/viewIssue/totalpost').subscribe((res) => {
      
      
      this.totalIssues=res

      console.log("Pending Issue", res)
    
    });
    
  }
  details(modalDispaly){
    this.fullDetails=modalDispaly

  }

}
