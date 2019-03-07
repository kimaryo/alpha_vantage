import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signInPage: boolean = true
  signIn: ngModel = { email: '', password: ''},
  createAccount: ngModel = { name: '', email: '', password: '', password2: ''},


  constructor() { }

  ngOnInit() {
  }

  onChangeSignInPage(value){
    this.signInPage = value
  }

  onLogin(){
    console.log(this.model.email)
  }

}
