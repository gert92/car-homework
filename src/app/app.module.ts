import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SingleCarComponent } from './components/single-car/single-car.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { SubnavComponent } from './components/subnav/subnav.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, HomepageComponent, LoginComponent, SingleCarComponent, NavComponent, FooterComponent, MainComponent, SubnavComponent, ProfileComponent, AddcarComponent, AlertComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
