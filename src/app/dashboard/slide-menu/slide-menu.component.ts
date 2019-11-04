import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.css']
})
export class SlideMenuComponent implements OnInit {
  userName:string
  constructor() { }

  ngOnInit() {
    this.userName = localStorage.getItem('LoggedInUser');
    console.log("usrname",this.userName);
  }
  
}
