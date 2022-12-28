export class AdminRoutingModule { }
import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { GezilenYerlerComponent } from "../gezilen-yerler/gezilen-yerler.component";
import { GezmekIstenilenYerlerComponent } from "../gezmek-istenilen-yerler/gezmek-istenilen-yerler.component";
import { HakkimizdaComponent } from "../hakkimizda/hakkimizda.component";
import { HaritaHareketleriComponent } from "../harita-hareketleri/harita-hareketleri.component";
import { NotfoundComponent } from "../notfound/notfound.component";
import { AuthGuard } from "../login-guard.service";

const appRoutes:Routes=[
    {path:'',component:HomeComponent,canActivate:[AuthGuard]},
    {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
    {path:'gezdiklerim',component:GezilenYerlerComponent,canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent},
    {path:'gezmekIstediklerim',component:GezmekIstenilenYerlerComponent,canActivate:[AuthGuard]},
    {path:'hakkimizda',component:HakkimizdaComponent,canActivate:[AuthGuard]},
    {path:'harita',component:HaritaHareketleriComponent,canActivate:[AuthGuard]},
    {path:'**',component:NotfoundComponent},
  ]
@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],exports:[RouterModule]
})
export class AppRoutingModule{}
