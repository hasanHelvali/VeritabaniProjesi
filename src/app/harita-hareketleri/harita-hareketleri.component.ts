import { ThisReceiver } from '@angular/compiler';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { timeInterval } from 'rxjs';
import { Konum } from '../konum';
import { Mekan } from '../mekan';
import { styles} from './mapstyles';
// import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-harita-hareketleri',
  templateUrl: './harita-hareketleri.component.html',
  styleUrls: ['./harita-hareketleri.component.css'],
})

@Injectable()
export class HaritaHareketleriComponent implements OnInit {
  markerKonum:Konum=new Konum();
  latitude:number;
  longitude:number;
  constructor(private activatedRoute:ActivatedRoute) {

  }
  ngOnInit(): void {
    const lat=this.activatedRoute.snapshot.queryParamMap.get('lat');
    console.log(lat);
    const lng=this.activatedRoute.snapshot.queryParamMap.get('lng');
    console.log(lng);

        const location={
      lat:+lat,
      lng:+lng
    }

       let loader=new Loader({
        apiKey:"AIzaSyAICLUJfhKCTgBM95-cMDoe1f9IQS8d1sc"

      });
      loader.load().then(()=>{
        console.log("loaded map")
        this.map=new google.maps.Map(document.getElementById('map'),{
          center:location,
          zoom:10,
          styles:styles,
        })

        const marker=new google.maps.Marker({
          position:location,
          map:this.map,

        })
      })
  }

  private map:google.maps.Map

  git(){
    document.location.href="https://www.google.com.tr/maps/";
  }
}
