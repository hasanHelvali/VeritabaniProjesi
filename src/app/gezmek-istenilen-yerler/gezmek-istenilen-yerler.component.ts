import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Mekan } from '../mekan';
import { Sehir } from '../sehir';

@Component({
  selector: 'app-gezmek-istenilen-yerler',
  templateUrl: './gezmek-istenilen-yerler.component.html',
  styleUrls: ['./gezmek-istenilen-yerler.component.css']
})
export class GezmekIstenilenYerlerComponent implements OnInit {
  private url="https://gel-gor-beni-default-rtdb.firebaseio.com/sehirler.json"
  private url2="https://gel-gor-beni-default-rtdb.firebaseio.com/sehirler"
  mekan:Mekan[]=[];
  data:Sehir[]=[];
  data2:Sehir[]=[];
  sehirListesi:Sehir[]=[];
  mekanlarListesi:Sehir["mekanlar"];
  mekanListesi:Mekan[]=[];
  categoryId3_Mekanlar:Mekan[]=[];

  ngOnInit(): void {
  }
  constructor(private http:HttpClient,private home:HomeComponent) {

    this.getPlaces();
   }

  getPlaces(){
    //categoryId 2 olan mekanları burada cekecez.
    this.http.get<Sehir[]>(this.url).subscribe((result)=>{
      const data:Sehir[]=[];

      for(const key in result){
        console.log(key+"firebasekey");
        //console.log(result[key]);
        //console.log({...result[key],id:key})//js destructure
        data.push({...result[key],id:key})//js destructure
        this.data.push(result[key]);
        this.data2.push({...result[key],id:key})
        console.log(data)
        //console.log(this.sehirBilgisi)
        this.sehirListesi=data;
        console.log(this.sehirListesi)
      }
      for (const i in this.sehirListesi) {
        console.log(i)
        console.log(this.sehirListesi[i])
        this.mekanlarListesi=this.sehirListesi[i].mekanlar;
        for (const key in this.mekanlarListesi) {
          console.log(key)
          console.log(this.mekanlarListesi[key])
          this.mekanListesi.push(this.mekanlarListesi[key])
        }
      }
      this.mekanListesi.forEach((mekan:Mekan)=>{
        if(mekan.categoryId==3)this.categoryId3_Mekanlar.push(mekan);
      })
    });

  }

  gezildi(gelenMekan:Mekan){
    let firebaseKey=this.fireKeyBul(gelenMekan);
    console.log(firebaseKey)//tıklanan mekanın firebasekey ı bulundu. Sımdı sorgu yapılabilir.
    this.http.get(this.url2+"/"+firebaseKey+"/mekanlar/"+gelenMekan.name.replaceAll(" ","")+"/.json").subscribe((result)=>{
      console.log(result)
    })
    this.http.put(this.url2+"/"+firebaseKey+"/mekanlar/"+gelenMekan.name.replaceAll(" ","")+"/categoryId/.json",2).subscribe((result)=>{
      console.log(result)
    })
    this.http.get(this.url2+"/"+firebaseKey+"/mekanlar/"+gelenMekan.name.replaceAll(" ","")+"/categoryId/.json").subscribe((result)=>{
      console.log(result)
    })
  }

  fireKeyBul(gelenMekan:Mekan){
    let fireKey:any;
    let mekanınBulunduguSehir="";
    let plaka=gelenMekan.id;
    let mod=(plaka % 10)
    plaka=plaka-mod;
    plaka=plaka/10
    for(const i in this.data){
      if(this.data[i].id==plaka){
        mekanınBulunduguSehir=this.data[i].name;
        }
    }

    console.log(this.data2+"data2")
    for(const i in this.data2){
      if(this.data2[i].name==mekanınBulunduguSehir){
        fireKey= this.data2[i].id;
      }
    }
    return fireKey;

   }
}




