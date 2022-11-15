import { getLocaleDateFormat } from '@angular/common';
import { Component, Injectable, OnInit, setTestabilityGetter } from '@angular/core';
import { Observable,of } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { Sehir } from './sehir';

@Injectable(
  // providedIn: 'root'

)




export class GeoLocationService  {
 BulunanSehir="";
//  sehir:string="";
  constructor(private sehir:Sehir) { }

  public konumBul(){
      if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
      }
    // return "konum bul calisiyor";
  }

   onError(err){
    //Bir hata oldugunda buraya err olarak bir hata objesı getırılecek
  console.log(err);
  // document.querySelector("#loading").style.display="none";
    //loading ikonunu kaybettık.
  }
  movies:[];

   async onSuccess(position){
    console.log(position);
    let enlem=position.coords.latitude;
    let boylam=position.coords.longitude;
    console.log(enlem,boylam);
    const api_key="d23a28e613f5446792a15b302c94df6d";
    const url=`https://api.opencagedata.com/geocode/v1/json?q=${enlem}+${boylam}&key=${api_key}`;
    const response=await fetch(url);
    const data=await response.json();//Gelen response dan bize bir data donmelı. Bu data yı json a cevırdım.
    console.log(data);//Elde ettıgım sonucun ılgılı alanlarında konumun detaylı bır sekılde geldıgını gordum.
    //detayları elde edelım.
    const country=data.results[0].components.country;//Bu sekılde ulke bılgısını aldım.
     const cityDetails= data.results[0].components.county !=undefined ?data.results[0].components.county: data.results[0].components.state+"/Merkez" ;//Bu sekılde ulke bılgısını aldım.

    // return cityDetails;

    // this.BulunanSehir = new Promise(function(resolve, reject){
    //   if (data.results[0].components.county !=undefined) {
    //     resolve(data.results[0].components.county);
    //   } else {
    //     reject('Bir sıkıntı var...');
    //   }
    // })

    // this.BulunanSehir.then(function(cevap){
    //   console.log(cevap+"--");
    //   console.log("------")
    // }).catch(function(hata){
    //   console.log(hata) // 'Bir sıkıntı var...' yazısını basar
    // })
    this.BulunanSehir=await cityDetails.toString();


    }


    sehirBelirle(sehir: any) {
      console.log("Bulunan Sehir "+sehir);
    }
  }
