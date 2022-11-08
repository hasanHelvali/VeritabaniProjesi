import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{
  loggedIn=false;
  redirectUrl;
  isAuthenticated(){
    const promise=new Promise((resolve,reject)=>{
      setTimeout(() => {
          resolve(this.loggedIn);
      }, 700);
    })
    return promise;
  }

  login(kullaniciAdi,sifre){
    if(kullaniciAdi=="Hasan"&&sifre=="049"){
      this.loggedIn=true;
    }
  }
  logout(){
    this.loggedIn=false;
  }
}
