import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Stock } from "../../shared/models/user.model";

const DUMMY_COMPANIES = ["MSFT", "BA", "AAPL", "TSLA"];
const API_KEY = "F8EATDHYRIQMFR0N";
const BASE_URL = "https://www.alphavantage.co/query?";

@Injectable()
export class StockService {
  constructor(private http: Http) {}

  getStock(): Observable<Stock[]> {
    return this.http
      .get(
        `${BASE_URL}function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=${API_KEY}`
      )
      .map((res: Response) => {
        const stock: Stock = res.json();
        console.log(stock);
      });
  }
}
