import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { stocks } from "./reducers/stocks.reducer";
import { auth } from "./reducers/auth.reducer";
import { SearchbarComponent } from "./searchbar/searchbar.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalContentComponent } from "./modal-content/modal-content.component";
import { FormsModule } from "@angular/forms";
import { HighchartsChartModule } from "highcharts-angular";
import { CompanyComponent } from "./company/company.component";
import { NgxLoadingModule } from "ngx-loading";
import { NgCircleProgressModule } from "ng-circle-progress";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    SearchbarComponent,
    ModalContentComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    NgCircleProgressModule.forRoot({
      radius: 20,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      animationDuration: 5000
    }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    StoreModule.forRoot({
      stocks,
      auth
    }),
    StoreDevtoolsModule.instrument(),
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent]
})
export class AppModule {}
