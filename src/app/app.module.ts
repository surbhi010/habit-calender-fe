import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { RouterModule,Router,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Router, Routes } from '@angular/router';

const myRoots: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full', canActivate:
      [AuthGuard]
  },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule,
    RouterModule.forRoot(
      myRoots,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpModule,
    HttpClientModule,
    FormsModule,
    // RouterModule.forRoot()
  ],
  providers: [AppService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
