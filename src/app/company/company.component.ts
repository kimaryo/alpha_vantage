import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { StockService } from "../core/service/stock.service";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"]
})
export class CompanyComponent implements OnInit {
  dates = [];
  sub: Object;
  chartData = [];
  companySymbol: String;
  Highcharts = Highcharts;
  stockData: Object;
  chartOptions = {
    series: [
      {
        data: this.chartData
      }
    ]
  };
  stocks: Object;
  metaData: Object;
  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private stockServices: StockService
  ) {
    this.stocks = stockServices.stocks;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.companySymbol = params["symbol"];
      // In a real app: dispatch action to load the details here.
    });

    this.subscription = this.stocks.subscribe(
      response => {
        // Currently the stocks is an array, a little bit contradictiv since we save it as an object.
        // TODO: Add an initial state to the reducer store.
        if (response.length !== 0) {
          this.metaData = response["Meta Data"];
          this.stockData = response["Time Series (Daily)"];
          this.dates = Object.keys(this.stockData).slice(0, 20);
          let chartData = [];
          console.log(this.stockData[this.dates[0]]["4. close"]);
          console.log(this.dates);
          for (let date in this.dates) {
            chartData.push(
              parseInt(this.stockData[this.dates[date]]["4. close"])
            );
          }
        }
        this.chartData = chartData;
        this.chartOptions = {
          series: [
            {
              data: this.chartData
            }
          ]
        };
        console.log(this.chartData);
      },
      error => console.log(error)
    );
  }

  getDataHighChart() {
    console.log(this.stockData);
    let chartData = [];
    for (let date in this.dates) {
      chartData.push(parseInt(this.stockData[this.dates[date]]["4. close"]));
    }
    console.log(chartData);
    return chartData;
  }
}
