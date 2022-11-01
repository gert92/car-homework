import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/nav/nav.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleCarComponent } from './components/single-car/single-car.component';
import { CarResolverResolver } from './resolvers/car-resolver.resolver';
import { CarownerResolver } from './resolvers/carowner.resolver';
import { UserResolver } from './resolvers/UserResolver';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: HomepageComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: 'cars/:id',
    component: SingleCarComponent,
    resolve: {
      user: UserResolver,
      car: CarResolverResolver,
    },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    resolve: {
      user: UserResolver,
      cars: CarownerResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'cars/:id',
  //   component: SingleCarComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
