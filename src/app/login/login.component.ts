import { Component, Injectable, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../login-guard.service';
import { NavbarComponent } from '../navbar/navbar.component';
@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _isLogin:boolean;
   kullaniciAdi:string;
   sifre:string;
   message:string;
  constructor(public router:Router,public authService:AuthService,private navbar:NavbarComponent) { }
  ngOnInit(): void {
  }

   login(kullaniciAdi:string,sifre:string){

    this.authService.login(kullaniciAdi,sifre);
    this.setMessage();
    this.authService.isAuthenticated()
    .then(isAuthenicated=>{
      if(isAuthenicated){
        this.navbar.message="Hosgeldiniz";
        let redirectUrl=this.authService.redirectUrl?this.router.parseUrl(this.authService.redirectUrl):'home';
        this.router.navigateByUrl(redirectUrl);
      }
    })

    // if(kullaniciAdi== "Hasan" && sifre=="049"){
    //   this._isLogin=true;
    //   console.log("true--");
    //   this.kullaniciAdi=kullaniciAdi;
    //   this.sifre=sifre;
      // this.router.navigate(['/home']);
    }

    logout(){
      this.authService.logout();
      this.setMessage();
    }

  setMessage(){
    this.message="logged";
    this.authService.isAuthenticated()
    .then((isAuthenticated:Boolean)=>{
      if(isAuthenticated){
        this.message+="in"
      }
      else{
        this.message+="out";
      }
    })
  }

}
