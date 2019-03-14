import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../core/service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  signInPage: boolean = true;
  signIn: { email: ""; password: "" };
  createAccount: { name: ""; email: ""; password: ""; password2: "" };
  signingIn: boolean = false;
  creatingAccount: boolean = false;
  auth: AuthService = null;

  constructor(private authService: AuthService) {
    this.auth = authService.auth;
  }

  ngOnInit() {
    this.authService.validateSession();
  }

  onChangeSignInPage(value) {
    this.signInPage = value;
  }

  onLogin() {
    this.authService.login(this.signIn.email, this.signIn.password);
  }

  onRegister() {
    this.authService.register(this.createAccount);
  }
}
