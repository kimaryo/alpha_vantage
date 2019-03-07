import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { AppStore } from '../app.store';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService) {
    private store: Store<AppStore>
    metaData: Object;
    stocks: Object;
    dates = [];
    today = new Date().toISOString().substring(0, 10);
  }

  ngOnInit() {
    let tmp = this.data.getData().subscribe(response => {
      this.metaData = response["Meta Data"];
      this.stocks = response["Time Series (Daily)"];
      this.dates = Object.keys(this.stocks).slice(0, 20);
    });
  }
}
