import { Component, OnInit } from "@angular/core";
import { StockService } from "../core/service/stock.service";
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
  dates = [];
  today = new Date().toISOString().substring(0, 10);
  constructor(private stockServices: StockService) {
    this.stocks = stockServices.stocks;
    let x;
  }

  ngOnInit() {
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
