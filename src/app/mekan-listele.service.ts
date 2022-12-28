import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoLocationService } from './geo-location.service';
import { NavbarComponent } from './navbar/navbar.component';
import { Sehir } from './sehir';

@Injectable()
export class MekanListeleService {
  constructor(private http:HttpClient) {

  }


}
