import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { StockService } from "../core/service/stock.service";
import * as Highcharts from "highcharts";

let startDate = new Date();
startDate.setDate(startDate.getDate() - 20);
let dd = startDate.getDate();
let mm = startDate.getMonth();
Highcharts.setOptions({
  title: { text: "Stock data past 20 days" }
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

  chartOptions: Object;
  fetchingStock: boolean = true;
  stockData: Object;
  showChart: boolean = false;
  stocks;
  metaData: Object;
  constructor(
    private route: ActivatedRoute,
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
        this.stocks = response;
        console.log(response);
        while (response.stocks.fetchingStock) {
          this.setDataHighChart();
        }
      },
      (this.loading = false),
      error => console.log(error)
    );
    const splitUrl = window.location.href.split("/");
  }

  setDataHighChart() {
    let chartData = [];
    if (this.stocks.stockShowing["Meta Data"]) {
      this.showChart = true;
      const stockData = this.stocks.stockShowing["Time Series (Daily)"];
      const dates = Object.keys(stockData).slice(0, 20);

      if (stockData) {
        for (let date in dates) {
          chartData.push(parseFloat(stockData[dates[date]]["4. close"]));
        }
        this.chartOptions = {
          series: [
            {
              data: {
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
                    day: "%e. %b"
                  }
                },
                series: [
                  {
                    pointStart: Date.UTC(2019, mm, dd),
                    pointInterval: 24 * 3600 * 1000, // one day,
                    name: "Closing value",
                    data: chartData
                  }
                ]
              }
            }
          ]
        };
      }
    }
  }
}
