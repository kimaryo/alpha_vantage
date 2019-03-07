import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { ContactComponent } from "../contact/contact.component";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})


export class HomeComponent implements OnInit {
  metaData: Object;
  stocks: Object;
  dates = [];
  today = new Date().toISOString().substring(0, 10);
  constructor(private data: DataService) {}

  ngOnInit() {
    let tmp = this.data.getData().subscribe(response => {
      this.metaData = response["Meta Data"];
      this.stocks = response["Time Series (Daily)"];
      this.dates = Object.keys(this.stocks).slice(0, 20);
    });
  }
}
