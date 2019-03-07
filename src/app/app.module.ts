import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
=======
import { SearchbarComponent } from './searchbar/searchbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
>>>>>>> 212fb6869a4e11d3bd1552ca8809d2eaa3a0dc39

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
<<<<<<< HEAD
    LoginComponent
=======
    SearchbarComponent,
    NgbModule
>>>>>>> 212fb6869a4e11d3bd1552ca8809d2eaa3a0dc39
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
