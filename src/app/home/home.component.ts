import { Component, OnInit } from "@angular/core";
import { StockService } from "../core/service/stock.service";
import { AuthService } from "../core/service/auth.service";
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { Router } from "@angular/router";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  metaData: Object;
  stocks;
  subscription;
  auth;
  dates = [];
  today = new Date().toISOString().substring(0, 10);
  constructor(
    private stockServices: StockService,
    private authService: AuthService,
    private router: Router
  ) {
    this.stocks = stockServices.stocks;
    this.auth = authService.auth;
  }

  ngOnInit() {
    this.authService.validateSession();
    this.subscription = this.stockServices.getStocks().subscribe(
      response => {
        this.stocks = response;
      },
      error => console.log(error)
    );
    this.subscription = this.auth.subscribe(
      response => {
        this.auth = response;
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
