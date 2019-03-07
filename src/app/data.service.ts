import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import StockService from "./core/service/stock.service";

@Injectable({
  providedIn: "root"
})
export class DataService {
  test_companies = ["MSFT", "BA", "AAPL", "TSLA"];
  api_key: string = "F8EATDHYRIQMFR0N";
  url_daily =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&";

  constructor(private http: HttpClient) {}

  firstClick() {
    return console.log("Clicked");
  }

  StockService();

  getData(): Observable<any[]> {
    return this.http
      .get(this.url_daily + `symbol=${"MSFT"}&apikey=${this.api_key}`)
      .pipe(
        map(response => {
          return response as any;
        })
      );
  }
}
