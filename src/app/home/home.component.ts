import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Sehir } from '../sehir';
import { MekanListeleService } from '../mekan-listele.service';
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GeoLocationService } from '../geo-location.service';
import { AuthService } from '../auth.service';
import { Mekan } from '../mekan';
import { HaritaHareketleriComponent } from '../harita-hareketleri/harita-hareketleri.component';
import { Konum } from '../konum';

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  listeleAktifMi=false;
  sehirBilgisi: string="";
  mekanlar:Sehir[];
  girisYapilmisMi=false;
  gosterilecekSehir:Sehir;
  gosterilecekMekanlar:Sehir;
  sehirListesi:Sehir[];
  konum:Konum;
  bulunulanSehrinFireBaseKeyi:string="";
  girilenMekan="";
  constructor(private http:HttpClient,private mekanListele:MekanListeleService,private auth:AuthService,
    private geoLocationService:GeoLocationService, private activatedRoute:ActivatedRoute
    ) {
    this.auth.isAuthenticated()
    .then(isAuthenicated=>{
      if(isAuthenicated){
        this.girisYapilmisMi=true;
      }
     })

    }

  private url="https://gel-gor-beni-default-rtdb.firebaseio.com/sehirler.json"
  private url2="https://gel-gor-beni-default-rtdb.firebaseio.com/sehirler"
//https://gel-gor-beni-default-rtdb.firebaseio.com/sehirler



s:string="";
mekann:Mekan[]=[];
  getPlaces(sehir:string):any{
    this.mekann=[];
    this.http.get<Sehir[]>(this.url).subscribe((result)=>{
      const data:Sehir[]=[];
      for(const key in result){
        console.log(key);
        //console.log(result[key]);
        //console.log({...result[key],id:key})//js destructure
        data.push({...result[key],id:key,firebaseKey:key})//js destructure
        //console.log(this.sehirBilgisi)
        this.sehirListesi=data;
        console.log(this.sehirListesi)
      }
      if(this.sehirBilgisi!=undefined){
        this.s=this.sehirBilgisi.replace("Merkez","").trim();
        // console.log(this.s+"*****************");
        this.s=this.s.replace("â","a");
        this.gosterilecekSehir=this.mekanAl(this.sehirListesi,this.s.toString());
        console.log(this.gosterilecekSehir+"----")
        // for(const i in this.gosterilecekSehir){
        //   console.log(i);
        //   console.log(this.gosterilecekSehir[i]);
        // }
        for(const j in this.gosterilecekSehir.mekanlar){
          console.log(j)
        //console.log(this.gosterilecekSehir.mekanlar[j]);
          this.mekann.push(this.gosterilecekSehir.mekanlar[j])
          console.log(this.gosterilecekSehir.name+" "+this.gosterilecekSehir.firebaseKey)
          this.bulunulanSehrinFireBaseKeyi=this.gosterilecekSehir.firebaseKey;
          console.log("Bulunulan Sehrin firebase key i"+this.bulunulanSehrinFireBaseKeyi)
        }
      }
      else{
        //sehri kendimiz girersek
      }
      return this.gosterilecekSehir;

    });
  }

  mekan:Sehir;
  mekanAl(_gelenSehir:Sehir[],s:string):Sehir{
    _gelenSehir.forEach(element => {
      console.log(element.name)
      console.log(s)
      if(element.name.toString()==s){
        console.log(element);
        this.mekan=element;
        console.log(this.mekan);

      }
    });
    return this.mekan;
  }
  getLocation(){
    this.girilenMekan=this.activatedRoute.snapshot.queryParamMap.get('konum');
    if(this.girilenMekan=="" || this.girilenMekan==undefined){
      this.geoLocationService.konumBul();
      this.sehirBilgisi=this.geoLocationService.sehrim
      this.getPlaces(this.sehirBilgisi);
    }
    else{
      console.log(this.girilenMekan);
      this.sehirBilgisi=this.girilenMekan
      this.getPlaces(this.sehirBilgisi);
    }

    }
    gezildi(gelenMekan:Mekan){
      /*Burada categoryId lerinin guncelleme ıslemını yapıyoruz. Bu guncelleme ıslemının yapılabılmesı ıcın bulunulanSehrinFireBase key i,
      sehrin meknaının anahtar ısmıyle ve name bılgısının bosluklar dıısnda aynı olması(ornegın BayburtKalesi ve Bayburt Kalesi gibi) ve
      bunlara baglı olarak yapılan sorguda da categoryId nin 2 seklınde asagıdakı gibi guncellenmesı gerekıyor. */
      this.http.get(this.url2+"/"+this.bulunulanSehrinFireBaseKeyi+"/mekanlar/"+gelenMekan.name.replaceAll(" ","")+"/.json").subscribe((result)=>{
        console.log(result)
      })
      this.http.put(this.url2+"/"+this.bulunulanSehrinFireBaseKeyi+"/mekanlar/"+gelenMekan.name.replaceAll(" ","")+"/categoryId/.json",2).subscribe((result)=>{
        console.log(result)
      })
      this.http.get(this.url2+"/"+this.bulunulanSehrinFireBaseKeyi+"/mekanlar/"+gelenMekan.name.replaceAll(" ","")+"/categoryId/.json").subscribe((result)=>{
        console.log(result)
      })
      /*Artık categoryId bilgileri guncellenmis oldu. Sımdı ise categoryId si 1 olmayan mekanları tum mekanlardan kaldırmak ve categoryid si 2
      olan mekanları gezılenYerlerde gostermemız gerekıyor. Tum bu ıslemlerı gezılmekIstenenYerler component kısmı ıcın de yapmamız gerekıyor. */
    }


    yolTarifi(gelenMekan:Mekan){
      console.log(gelenMekan.latitude)
      console.log(gelenMekan.longitude)
      //  this.haritaa=new HaritaHareketleriComponent(gelenMekan.latitude,gelenMekan.longitude);
      this.konum=new Konum();
      this.konum.lat=+gelenMekan.latitude;
      this.konum.lng=+gelenMekan.longitude;
      console.log(this.konum.lat+"---")
      console.log(this.konum.lng+"---")
      // const harita:HaritaHareketleriComponent=new HaritaHareketleriComponent(this.konum);
      }

      favoriyeEkle(gelenMekan:Mekan){
        this.http.get(this.url2+"/"+this.bulunulanSehrinFireBaseKeyi+"/mekanlar/"+gelenMekan.name.replaceAll(" ","")+"/.json").subscribe((result)=>{
          console.log(result)
        })
        this.http.put(this.url2+"/"+this.bulunulanSehrinFireBaseKeyi+"/mekanlar/"+gelenMekan.name.replaceAll(" ","")+"/categoryId/.json",3).subscribe((result)=>{
          console.log(result)
        })
        this.http.get(this.url2+"/"+this.bulunulanSehrinFireBaseKeyi+"/mekanlar/"+gelenMekan.name.replaceAll(" ","")+"/categoryId/.json").subscribe((result)=>{
          console.log(result)
        })
      }

      // mekanOlustur(){
      //   const place={
      //     id:23,
      //     name:"Elazığ",
      //     mekanlar:{
      //       HarputKalesi:{
      //       id:231,
      //       name:"Harput Kalesi",
      //       description:"Harput Kalesi, Urartular tarafından dikdörtgen bir plan üzerine kurularak yapılmış olan mimari yapıdır. Şu anki Elazığ il sınırları içerisindeki tarihi Harput mahallesinde bulunmaktadır. Kale, iç ve dış kale olmak üzere iki bölümden oluşmaktadır.",
      //       imgUrl:"https://upload.wikimedia.org/wikipedia/commons/e/ee/Harput_kalesi-Harput-Elaz%C4%B1%C4%9F_-_panoramio.jpg",
      //       categoryId:1,
      //       latitude:38.704123,
      //       longitude:39.257309

      //       },
      //       HazarGölü:{
      //         id:232,
      //         name:"Hazar Gölü",
      //         description:"Hazar Gölü, diğer adıyla Gölcük Gölü, Türkiye'nin Elazığ ilinde yer alan, güneybatı-kuzeydoğu doğrultusunda uzanan tektonik bir göldür.",
      //         imgUrl:"https://www.azbibak.com/wp-content/uploads/2018/02/hazar-golu-k%C4%B1s.jpg",
      //         categoryId:1,
      //         latitude:38.48879779580837,
      //         longitude:39.40092552377832
      //         },
      //       KebanBarajı:{
      //         id:233,
      //         name:"Keban Barajı",
      //         description:"Keban Barajı, Elazığ ilinin Keban ilçesinde, Fırat Nehri üzerinde, 1965-1975 yılları arasında inşa edilmiş olan elektrik enerjisi üretimi amaçlı barajdır.",
      //         imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/KebanDam.JPG/1200px-KebanDam.JPG",
      //         categoryId:1,
      //         latitude:38.806374902117255,
      //         longitude:38.756082884114605
      //         },
      //         HarputUluCami:{
      //         id:234,
      //         name:"Harput Ulu Cami",
      //         description:"Harput Ulu Cami, Artuklu hükümdarı Fahrettin Karaaslan tarafından 1156 - 1157 yılları arasında günümüzde Elazığ ili sınırı içindeki Harput'ta yaptırılan cami. Hâlen ibadete açık olan caminin minaresi hafif sağ tarafa eğik konumdadır.",
      //         imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Harput_Ulu_Cami_9621.jpg/1200px-Harput_Ulu_Cami_9621.jpg",
      //         categoryId:1,
      //         latitude:38.7061729269997,
      //         longitude:39.255214696239996

      //       },
      //       PaluKalesi:{
      //         id:235,
      //         name:"Palu Kalesi",
      //         description:"Palu Kalesi, Elazığ'ın Palu ilçesinde yer alan tarihî bir kaledir. Kaya üzerine inşa edilen kale, Urartular döneminden kalmadır. Urartu kralı Menuas tarafından yaptırılmıştır.",
      //         imgUrl:"https://www.ktb.gov.tr/Resim/226908,60-61--kilise--palujpg.png?0",
      //         categoryId:1,
      //         latitude:38.70235572615566,
      //         longitude:39.95441040415774
      //       }

      //     }
      //   }
      //   const place2={
      //     id:69,
      //     name:"Bayburt",
      //     mekanlar:{
      //       BaksıMüzesi:{
      //         id:691,
      //         name:"Baksı Müzesi",
      //         description:"Baksı Müzesi Bayburt’a 45 km uzaklıktaki Bayraktar Köyü'nde kurulu sanat müzesidir. Kurulduğu Bayraktar Köyü'nün eski adı olan baksı sözcüğü eski Türklerde bilgin, hekim, şaman anlamlarına gelmektedir. Müze, çağdaş sanat ve geleneksel el sanatlarına ev sahipliği yapmaktadır.",
      //         imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Baksimuseum.jpg/375px-Baksimuseum.jpg",
      //         categoryId:1,
      //         latitude:40.38515978811575,
      //         longitude:40.56654159632079
      //       },
      //       AydıntepeYeraltıŞehri:{
      //         id:692,
      //         name:"Aydıntepe Yeraltı Şehri",
      //         description:"Bayburt’un Aydıntepe ilçesinde yer alan kent, tüf içerisinde, yüzeyden 2-2,5 metre derinde başka yapı malzemesi kullanmadan ana kayaya oyulmuş galeriler, tonozlu odalar ve bu odaların açıldığı daha geniş mekanlardan oluşmaktadır. Yaklaşık bir metre genişliğinde ve 2 ile 2,5 metre yüksekliğinde tonoz örtülü galeriler yer yer her iki yana genişlemektedir. Kareye yakın planlı odalar bu mekana açılmaktadır. Ayrıca gözetleme mekanlarının oluşturduğu havalandırma amaçlı konik biçimdeki deliklerin, galeri odalarını aydınlatmak için duvarlara delik açıldığı gözlenmektedir.",
      //         imgUrl:"https://www.azbibak.com/wp-content/uploads/2017/12/ayd%C4%B1ntepe-yeralt%C4%B1-%C5%9Fehri3.jpg",
      //         categoryId:1,
      //         latitude:40.38853879964017,
      //         longitude:40.15080852515691
      //         },
      //       BayburtKalesi:{
      //         id:693,
      //         name:"Bayburt Kalesi",
      //         description:"Bayburt Kalesi, Bayburt şehrine hakim bir tepede bulunan tarihî kale. Kalenin ilk defa ne zaman, kimler tarafından yaptırıldığı bilinmemektedir. Kale çeşitli zamanlarda onarılmıştır. Bizans İmparatoru I. Justinianus zamanında onarılmıştır. Türklerin Anadolu'da ilk ele geçirdikleri yerlerden olan Bayburt Kalesi Selçuklu Hanedanı, Saltuklular ve Danişmendliler zamanında tahkim edilmiştir. II. Kılıçarslan'ın Erzurum idarecisi olan oğlu Tuğrul Şah zamanında kale Trabzon İmparatorluğu'ndan gelebilecek tehditlere karşı en geniş ve esaslı onarımını geçirmiştir.",
      //         imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Bayburt_kalesi.JPG/405px-Bayburt_kalesi.JPG",
      //         categoryId:1,
      //         latitude:40.263439384501304,
      //         longitude:40.229845825150825
      //         },
      //       KopDağıMüdafasıTarihiMilliParkı:{
      //         id:694,
      //         name:"Kop Dağı Müdafası Tarihi Milli Parkı",
      //         description:"Kop Dağı Müdafaası Tarihî Millî Parkı, Türkiye'nin Bayburt ve Erzurum il sınırları içerisinde yer alan millî park. 2016/9486 sayılı Bakanlar Kurulu kararı ile 31 Ekim 2016 tarihinde millî park olarak ilân edilen alan I. Dünya Savaşı sırasında Ruslara karşı Kop Savunması olarak bilinen çarpışmaların yaşandığı noktadır. Osmanlıların 3. Ordu ile muzaffer olduğu alanın rekreasyonu da bu tarihî değeri göz önünde bulundurularak yapılmıştır.",
      //         imgUrl:"https://cdn.iha.com.tr/Contents/images/2016/46/1838512.jpg",
      //         categoryId:1,
      //         latitude:40.2630585065617,
      //         longitude:40.224807496314824
      //         },
      //       ÇoruhNehri:{
      //         id:695,
      //         name:"Çoruh Nehri",
      //         description:"Türkiye'nin kuzey-doğusundaki Erzurum ili sınırları içerisindeki Mescit Dağları'ndan doğan bir nehirdir. Kelkit-Çoruh Fayı boyunca Bayburt, İspir, Yusufeli ve Artvin şehirlerinden akarak Gürcistan'a ulaşır ve buradan; yani Batum'un hemen güneyinden, Türkiye-Gürcistan sınırının birkaç kilometre kuzeyinden, Karadeniz'e dökülür.",
      //         imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%C3%87oruh_River.jpg/435px-%C3%87oruh_River.jpg",
      //         categoryId:1,
      //         latitude:40.260499696477964,
      //         longitude:40.22781949887041
      //         }
      //     }


      //   }
      //   this.http.post("https://gel-gor-beni-default-rtdb.firebaseio.com/sehirler.json",place)
      //   .subscribe(data=>console.log(data));
      // }

    }



























