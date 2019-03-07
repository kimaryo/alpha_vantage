import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"]
})
export class CompanyComponent implements OnInit {
  companySymbol: String;
  Highcharts = Highcharts;
  chartOptions = {
    series: [
      {
        data: this.getDataHighChart()
      }
    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.companySymbol = params["symbol"];
      // In a real app: dispatch action to load the details here.
    });
  }

  getDataHighChart() {
    return [];
    let chartData = [];
    console.log(this.stocks);
    for (let date of this.dates) {
      chartData.push(this.stocks[date]["4. close"]);
    }
    return chartData;
  }
}
