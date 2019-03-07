import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  appTitle: string = "StockList™";
  visible: boolean = false
  constructor() {}

  ngOnInit() {
    const splitUrl = window.location.href.split('/')
    if (splitUrl[splitUrl.length - 1] === 'login' || splitUrl[splitUrl.length - 1] === 'register')
      this.visible = false
    else
      this.visible = true
  }
}
