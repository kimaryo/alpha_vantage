import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { StockService } from "../core/service/stock.service";
import { AuthService } from "../core/service/auth.service";
import * as Highcharts from "highcharts";

let startDate = new Date();
startDate.setDate(startDate.getDate() - 20);
let dd = startDate.getDate();
let mm = startDate.getMonth();
Highcharts.setOptions({
  title: { text: "Stock data past 20 days" },
  yAxis: {
    title: {
      text: "USD"
    }
  },
  xAxis: {
    title: {
      text: "Date"
    },
    type: "datetime",
    dateTimeLabelFormats: {
      day: "%e %b"
    }
  },
  plotOptions: {
    series: {
      pointStart: Date.UTC(2019, mm, dd),
      pointInterval: 24 * 3600 * 1000 // one day
    }
  }
});

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"]
})
export class CompanyComponent implements OnInit {
  dates = [];
  sub;
  loading = false;
  subscription;
  companySymbol: String;
  Highcharts = Highcharts;
  chartOptions = {
    series: [
      {
        data: this.updateChart()
      }
    ]
  };
  fetchingStock: boolean = true;
  stockData: Object;
  showChart: boolean = false;
  stocks: Object;
  metaData: Object;
  auth: Object;
  constructor(
    private route: ActivatedRoute,
    private stockServices: StockService,
    private authService: AuthService
  ) {
    this.stocks = stockServices.stocks;
    this.auth = authService.auth;
  }
  ngOnInit() {
    this.authService.validateSession();
    this.loading = true;
    this.sub = this.route.params.subscribe(params => {
      this.companySymbol = params["symbol"];
    });

    this.subscription = this.stocks.subscribe(
      response => {
        this.stocks = response;
      },
      (this.loading = false),
      error => console.log(error)
    );

    this.subscription = this.auth.subscribe(
      response => {
        this.auth = response;
      },
      (this.loading = false),
      error => console.log(error)
    );

    setTimeout(() => this.updateChart(), 4000);
  }

  updateChart() {
    let chartData = [];
    console.log(this.stocks);
    if (this.stocks) {
      const stock = this.stocks.stocks.find(
        s => s["Meta Data"]["2. Symbol"] === this.companySymbol
      );
      const stockData = stock["Time Series (Daily)"];
      const dates = Object.keys(stockData).slice(0, 20);

      if (stockData) {
        for (let date in dates) {
          chartData.push(parseFloat(stockData[dates[date]]["4. close"]));
        }
        this.chartOptions = {
          series: [
            {
              name: "Closing value",
              data: chartData
            }
          ]
        };
      }
    }
  }
}
