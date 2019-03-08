import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../core/service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signInPage: boolean = true
  signIn: ngModel = { email: '', password: ''}
  createAccount: ngModel = { name: '', email: '', password: '', password2: ''}
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.validateSession()
  }

  onChangeSignInPage(value){
    this.signInPage = value
  }

  onLogin(){
    this.authService.login(this.signIn.email, this.signIn.password)
  }

  onRegister() {
    this.authService.register(this.createAccount)
  }

}