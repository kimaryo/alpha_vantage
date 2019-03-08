import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/service/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  appTitle: string = "StockList™";
  visible: boolean = false
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const splitUrl = window.location.href.split('/')
    if (splitUrl[splitUrl.length - 1] === '')
      this.visible = false
    else
      this.visible = true
  }

  signOut(){
    this.visible = false
    this.authService.signOut()
  }
}
