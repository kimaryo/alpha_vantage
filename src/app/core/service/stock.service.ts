import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { Stock } from "../../shared/models/stock.model";
import { AppStore } from "../../app.store";

const DUMMY_COMPANIES = ["MSFT", "BA", "AAPL", "TSLA"];
const API_KEY = "F8EATDHYRIQMFR0N";
const BASE_URL = "https://www.alphavantage.co/query?";

@Injectable({
  providedIn: "root"
})
export class StockService {
  stocks: Object;
  constructor(private http: HttpClient, private store: Store<AppStore>) {
    this.stocks = store.select(s => s.stocks);
  }

  getStock(symbol) {
    this.store.dispatch({ type: "GET_STOCK" });
    return this.http
      .get(
        `${BASE_URL}function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
      )
      .pipe(
        map(res => {
          const stock = res;

          return new Stock().deserialize(stock);
        })
      )
      .subscribe(res => {
        this.store.dispatch({ type: "GET_STOCK_SUCCESS", payload: res });
      });
  }
}
