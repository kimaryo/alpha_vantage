import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { StockService } from "../core/service/stock.service";
import * as Highcharts from "highcharts";

var startDate = new Date();
startDate.setDate(startDate.getDate() - 20);
var dd = startDate.getDate();
var mm = startDate.getMonth();
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
  sub: Object;
  loading = false;
  subscription: Object;
  chartData = [];
  companySymbol: String;
  Highcharts = Highcharts;
  stockData: Object;

  chartOptions = {
    series: [
      {
        data: this.setDataHighChart()
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
    this.loading = true;
    this.sub = this.route.params.subscribe(params => {
      this.companySymbol = params["symbol"];
    });

    this.subscription = this.stocks.subscribe(
      response => {
        // Currently the stocks is an array, a little bit contradictiv since we save it as an object.
        // TODO: Add an initial state to the reducer store.
        if (response.length !== 0) {
          this.metaData = response["Meta Data"];
          this.stockData = response["Time Series (Daily)"];
          this.dates = Object.keys(this.stockData).slice(0, 20);
        }
        this.setDataHighChart();
      },
      (this.loading = false),
      error => console.log(error)
    );
  }

  setDataHighChart() {
    let chartData = [];
    if (this.stockData) {
      for (let date in this.dates) {
        chartData.push(parseInt(this.stockData[this.dates[date]]["4. close"]));
      }
      this.chartData = chartData;
      this.chartOptions = {
        series: [
          {
            name: "Closing value",
            data: this.chartData
          }
        ]
      };
    }
  }
}
