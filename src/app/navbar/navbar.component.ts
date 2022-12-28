import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { empty, Observable,of, ObservableInputTuple, Observer } from 'rxjs';
import { GeoLocationService } from '../geo-location.service';
import { HomeComponent } from '../home/home.component';
import { Sehir } from '../sehir';

@Injectable()
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[GeoLocationService]
})
export class NavbarComponent implements OnInit {

  listelemeEtkinMi=false;
  message:string="";
  public konum:string="";

  constructor(public geoLocationService:GeoLocationService,public sehir:Sehir,private home:HomeComponent) {
  }

  public gelenVeri;

  ngOnInit(): void {
  }
    getLocation(girilenSehir:string|undefined){
    if(girilenSehir==null  || girilenSehir==""){
      this.geoLocationService.konumBul();
      // this.konum=this.geoLocationService.konum;
      // console.log(await this.geoLocationService.data+"--");
      // console.log(this.geoLocationService.BulunanSehir);
      //console.log(this.geoLocationService.sehrim+"navbardayiz")
      this.konum=this.geoLocationService.sehrim
      console.log(this.konum)
      this.home.sehirBilgisi=this.geoLocationService.sehrim;

    }
    else{
      //konumun kullanıcı tarafından girildigi durum.
      this.konum=girilenSehir;
      console.log(girilenSehir)
      this.home.sehirBilgisi=girilenSehir;
    }

    }
    getPlace():Observable<string>{
      const a=new Observable<string>((observer)=>{
        if(this.konum!=undefined){
          observer.next(this.konum);
        }
      })
      return a;
  }


yerGetir(konum:string){
  console.log("Konum gonderildi.")
}



    }








