import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

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

  getTestUsers() {
    return {
      bestMatches: [
        {
          "1. symbol": "BA",
          "2. name": "The Boeing Company",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "USD",
          "9. matchScore": "1.0000"
        },
        {
          "1. symbol": "BSVN",
          "2. name": "Bank7 Corp.",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "USD",
          "9. matchScore": "0.8000"
        },
        {
          "1. symbol": "BABA",
          "2. name": "Alibaba Group Holding Limited",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "USD",
          "9. matchScore": "0.6667"
        },
        {
          "1. symbol": "BAC",
          "2. name": "Bank of America Corporation",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "USD",
          "9. matchScore": "0.4000"
        },
        {
          "1. symbol": "BIDU",
          "2. name": "Baidu Inc.",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "USD",
          "9. matchScore": "0.3333"
        },
        {
          "1. symbol": "BHC",
          "2. name": "Bausch Health Companies Inc.",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "USD",
          "9. matchScore": "0.3333"
        },
        {
          "1. symbol": "GOLD",
          "2. name": "Barrick Gold Corporation",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "USD",
          "9. matchScore": "0.3333"
        },
        {
          "1. symbol": "BZUN",
          "2. name": "Baozun Inc.",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "USD",
          "9. matchScore": "0.3333"
        },
        {
          "1. symbol": "BLDP",
          "2. name": "Ballard Power Systems Inc.",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "USD",
          "9. matchScore": "0.1538"
        }
      ]
    };
  }

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
