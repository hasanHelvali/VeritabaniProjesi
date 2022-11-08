import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { LoginComponent } from "./login/login.component";

@Injectable()
export class AuthGuard implements CanActivate{
  public isLogin;
  constructor(private router:Router,private authService:AuthService){}


  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot) {

    return this.authService.isAuthenticated()
    .then((authenticated:Boolean)=>{
      if(authenticated){
        return true;
      }
      else{
        this.authService.redirectUrl=state.url;
        this.router.navigate(['login']);
        return false;
      }
    })
    }


}
