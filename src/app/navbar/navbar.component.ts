import { Component, Injectable, OnInit } from '@angular/core';

@Injectable()
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  message:string;
  constructor() {
  }

  ngOnInit(): void {
  }




}
