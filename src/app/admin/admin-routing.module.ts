import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AuthGuard } from '../login-guard.service';

const routes:Routes=[
  {path:'login',canActivate:[AuthGuard]}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[AuthGuard]
})
export class AdminRouting{

}
