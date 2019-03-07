import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"]
})
export class CompanyComponent implements OnInit {
  dates = [];
  sub: Object;
  companySymbol: String;
  Highcharts = Highcharts;
  chartOptions = {
    series: [
      {
        data: this.getDataHighChart()
      }
    ]
  };
  stocks: Object;
  metaData: Object;
  constructor(private route: ActivatedRoute, private data: DataService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.companySymbol = params["symbol"];
      // In a real app: dispatch action to load the details here.
    });
    this.data.getData().subscribe(response => {
      this.metaData = response["Meta Data"];
      this.stocks = response["Time Series (Daily)"];
      this.dates = Object.keys(this.stocks).slice(0, 20);
      console.log(this.stocks);
    });
  }

  getDataHighChart() {
    console.log(this.stocks);
    let chartData = [];
    for (let date of this.dates) {
      chartData.push(this.stocks[date]["4. close"]);
    }
    return chartData;
  }
}
