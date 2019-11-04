import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'; 
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-pending-issues',
  templateUrl: './pending-issues.component.html',
  styleUrls: ['./pending-issues.component.css']
})
export class PendingIssuesComponent implements OnInit {
  pendingIssues:any;
  fullDetails:any;
  constructor(private pendingService:HttpService) { }

  ngOnInit() {

    return this.pendingService.get('/viewIssue/pending').subscribe((res) => {
      
      
      this.pendingIssues=res

      console.log("Pending Issue", res)
    
    });
    
  }
  details(modalDispaly){
    this.fullDetails=modalDispaly

  }
  approveda(){
    //swal.fire('Hello world!')
    swal.fire('Oops...', 'Something went wrong!', 'error',)
  }
  approved(){
    swal.fire({
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approved it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Approved!',
          '',
          'success'
        )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  rejected(){
    swal.fire({
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Rejected it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'rejected!',
          '',
          'success'
        )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }
}
