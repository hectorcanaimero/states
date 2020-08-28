import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    RouterModule
  ]
})
export class AuthModule { }
