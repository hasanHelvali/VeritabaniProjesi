import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // login:LoginComponent=new LoginComponent();
  constructor(private router:Router) {
  //  let sasassa=this.loginComponent.login("Hasan","049");
  //   console.log(sasassa);
  }





  ngOnInit(): void {
  }

}
