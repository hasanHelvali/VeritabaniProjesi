import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { GezilenYerlerComponent } from './gezilen-yerler/gezilen-yerler.component';
import { GezmekIstenilenYerlerComponent } from './gezmek-istenilen-yerler/gezmek-istenilen-yerler.component';
import { HaritaHareketleriComponent } from './harita-hareketleri/harita-hareketleri.component';
import { AdminComponent } from './admin/admin.component';
import { HakkimizdaComponent } from './hakkimizda/hakkimizda.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './login-guard.service';
import { AuthService } from './auth.service';
import { GeoLocationService } from './geo-location.service';
import { Observable } from 'rxjs';
import { Sehir } from './sehir';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    NotfoundComponent,
    HomeComponent,
    GezilenYerlerComponent,
    GezmekIstenilenYerlerComponent,
    HaritaHareketleriComponent,
    AdminComponent,
    HakkimizdaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [AuthGuard,LoginComponent,AuthService,NavbarComponent,GeoLocationService,Sehir],
  bootstrap: [AppComponent]
})
export class AppModule { }
