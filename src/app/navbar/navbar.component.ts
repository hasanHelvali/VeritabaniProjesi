import { Component, Injectable, OnInit } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { GeoLocationService } from '../geo-location.service';
import { Sehir } from '../sehir';

@Injectable()
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[GeoLocationService]
})
export class NavbarComponent implements OnInit {

  message:string;
  public konum:string;
  constructor(public geoLocationService:GeoLocationService,public sehir:Sehir) {
  }


  ngOnInit(): void {
  }
    getLocation(girilenSehir:string|undefined){
    if(girilenSehir==null  || girilenSehir==""){
       this.geoLocationService.konumBul();
      // this.konum=this.geoLocationService.konum;
      // console.log(await this.geoLocationService.data+"--");
      // console.log(this.geoLocationService.BulunanSehir);

    }
    else{
      //konumun kullanıcı tarafından girildigi durum.
      this.konum=girilenSehir;
      console.log(girilenSehir);
    }
  }




}
