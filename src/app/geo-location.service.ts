import { getLocaleDateFormat } from '@angular/common';
import { Component, Injectable, OnInit, setTestabilityGetter } from '@angular/core';
import { Observable,of } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';
import { MekanListeleService } from './mekan-listele.service';
import { NavbarComponent } from './navbar/navbar.component';
import { Sehir } from './sehir';

@Injectable(
  // providedIn: 'root'

)




export class GeoLocationService  {
  // observable;
bulunanSehir="";
 BulunanSehir1;
 data;
 observable;
 enlem;
 boylam;
 konum;
 konumObjesi={enlem:"",boylam:""};
 sehrim;
 listeleEtkin:false;
//  sehir:string="";
  constructor() {


   }

public konumBul(){

  const locations = new Observable((observer) => {
    let watchId: number;
    if (navigator.geolocation) {
       navigator.geolocation.watchPosition((position) => {
        observer.next(position);
    //console.log(position.coords.latitude);
    this.konumObjesi.enlem=position.coords.latitude.toString();
    this.konumObjesi.boylam=position.coords.longitude.toString();
    let enlem=position.coords.latitude;
    let boylam=position.coords.longitude;
    //console.log(enlem,boylam);
    observer.complete();

    //observer.next(enlem+"enlem")
    //observer.next(boylam+"boylam")
    this.KonumBul2(enlem,boylam);
      }, (error: GeolocationPositionError) => {
        observer.error(error);
      });
    } else {
      observer.error('Geolocation not available');
    }


    // Stop listening for location after 10 seconds
    setTimeout(() => {
      locationsSubscription.unsubscribe();
    }, 5000);
    // When the consumer unsubscribes, clean up data ready for next subscription.

    return {
      unsubscribe() {
        navigator.geolocation.clearWatch(watchId);
      }
    };

  });


  // Call subscribe() to start listening for updates.
  const locationsSubscription = locations.subscribe((data)=>{
    //console.log(data)
    //this.BulunanSehir1=data[0].coords.latitude;

    //console.log(data.coords.latitude+"data yazdırıldı")
    //console.log(this.BulunanSehir1.latitue+"sehir")
    this.konumGoster();
  }
  );




  }

  konumGoster(){
    console.log(this.BulunanSehir1+"//")

    //console.log(this.BulunanSehir1+"------");
    //console.log(this.enlem+"enlem yazdırıldı.")
    //console.log(this.konumObjesi.enlem+"enlem yazdıırldı")
    //console.log(this.konumObjesi.boylam+"boylam yazdıırldı")
  }


  public async KonumBul2(enlem,boylam){

    const api_key="d23a28e613f5446792a15b302c94df6d";
    const url=`https://api.opencagedata.com/geocode/v1/json?q=${enlem}+${boylam}&key=${api_key}`;
    const response=await fetch(url);
    const data=await response.json();//Gelen response dan bize bir data donmelı. Bu data yı json a cevırdım.
    //console.log(data);//Elde ettıgım sonucun ılgılı alanlarında konumun detaylı bır sekılde geldıgını gordum.

    const observer2=new Observable((observer)=>{
      //observer.next(data);
      const country=data.results[0].components.country;//Bu sekılde ulke bılgısını aldım.
     const cityDetails= data.results[0].components.county !=undefined ?data.results[0].components.county: data.results[0].components.state+"/Merkez" ;//Bu sekılde ulke bılgısını aldım.
    //console.log(country)
    //console.log(cityDetails)
    observer.next(cityDetails);
    observer.complete();
    });

    const tuketici2=observer2.subscribe((data)=>{
      this.sehrim=data;



    })


  }

  public sehirGetir():Observable<any>{
    return this.sehrim;
  }

}



