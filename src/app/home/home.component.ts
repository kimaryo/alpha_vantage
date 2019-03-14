import { Component, OnInit } from "@angular/core";
import { StockService } from "../core/service/stock.service";
import { AuthService } from "../core/service/auth.service";
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  metaData: Object;
  stocks: Object;
  subscription: Object;
  user: Object;
  dates = [];
  today = new Date().toISOString().substring(0, 10);
  constructor(
    private data: DataService,
    private stockServices: StockService,
    private authService: AuthService
  ) {
    this.stocks = stockServices.stocks;
    this.user = authService.auth.user;
  }

  ngOnInit() {
    this.authService.validateSession();
    this.subscription = this.stocks.subscribe(
      response => {
        // Currently the stocks is an array, a little bit contradictiv since we save it as an object.
        // TODO: Add an initial state to the reducer store.
        if (response.length !== 0) {
          this.metaData = response["Meta Data"];
          this.stocks = response["Time Series (Daily)"];
          this.dates = Object.keys(this.stocks).slice(0, 20);
        }
      },
      error => console.log(error)
    );
    this.stockServices.getStock();
    setTimeout(() => console.log(this.stocks), 2000);
    setTimeout(() => console.log(this.authService.auth), 2000);

    if (this.authService.user && this.authService.user._id) {
      console.log(this.authService.user._id);
      this.stockServices.getMyStocks(this.authService.user._id);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
