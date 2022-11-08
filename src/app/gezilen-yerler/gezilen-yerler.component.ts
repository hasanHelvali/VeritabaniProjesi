import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gezilen-yerler',
  templateUrl: './gezilen-yerler.component.html',
  styleUrls: ['./gezilen-yerler.component.css']
})
export class GezilenYerlerComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
