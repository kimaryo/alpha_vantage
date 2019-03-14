import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { HttpHeaders } from "@angular/common/http";
import { ModalContentComponent } from "../../modal-content/modal-content.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Stock } from "../../shared/models/stock.model";
import { AppStore } from "../../app.store";

import * as Storage from "../../helpers/Storage";

const BASE_URL = "https://fathomless-plains-38408.herokuapp.com/";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  auth: any;
  constructor(
    private http: HttpClient,
    private store: Store<AppStore>,
    private modalService: NgbModal
  ) {
    this.auth = store.select(s => s.auth);
  }

  register(data) {
    this.store.dispatch({ type: "CREATE_ACCOUNT" });
    return this.http.post(`${BASE_URL}users/register`, data).subscribe(
      response => {
        if (response.status === "409") {
          this.store.dispatch({ type: "CREATE_ACCOUNT_FAILED" });
          const modalRef = this.modalService.open(ModalContentComponent);
          modalRef.componentInstance.content = {
            title: "Email already in use",
            text: "Email is already in use. Please try again"
          };
        } else {
          this.store.dispatch({ type: "CREATE_ACCOUNT_SUCCESS" });
          const modalRef = this.modalService.open(ModalContentComponent);
          modalRef.componentInstance.content = {
            title: "Account created",
            text: "You have now been registered"
          };
        }
      },
      error => {
        if (error.status === 200) {
          this.store.dispatch({ type: "CREATE_ACCOUNT_SUCCESS" });
          const modalRef = this.modalService.open(ModalContentComponent);
          modalRef.componentInstance.content = {
            title: "Account created",
            text: "You have now been registered"
          };
        } else if (error.status === 409) {
          this.store.dispatch({ type: "CREATE_ACCOUNT_FAILED" });
          const modalRef = this.modalService.open(ModalContentComponent);
          modalRef.componentInstance.content = {
            title: "Email already in use",
            text: "Email is already in use. Please try again"
          };
        } else {
          this.store.dispatch({ type: "CREATE_ACCOUNT_FAILED" });
          const modalRef = this.modalService.open(ModalContentComponent);
          modalRef.componentInstance.content = {
            title: "Something went wrong",
            text: "Something went wrong. Please try again"
          };
        }
      }
    );
  }

  getConfig(token) {
    let headers = new HttpHeaders({
      authorization: "bearer " + token
    });
    let options = { headers: headers };
    return options;
  }

  validateSession() {
    const token = Storage.getToken();
    this.store.dispatch({ type: "LOG_IN" });
    if (token)
      return this.http
        .post(
          `${BASE_URL}users/validate`,
          { test: "test" },
          this.getConfig(token)
        )
        .subscribe(
          response => {
            console.log(response);
            if (response.status === 404) {
              this.store.dispatch({ type: "LOG_IN_FAILED" });
              const modalRef = this.modalService.open(ModalContentComponent);
              modalRef.componentInstance.content = {
                title: "Something went wrong",
                text: "Something went wrong. Please try again"
              };
            }
            if (response) {
              this.store.dispatch({
                type: "LOG_IN_SUCCESS",
                payload: response.user
              });
              const splitUrl = window.location.href.split("/");
              if (splitUrl[splitUrl.length - 1] !== "home")
                window.location.replace("/home");
            }
          },
          error => {
            this.store.dispatch({ type: "LOG_IN_FAILED" });
            const modalRef = this.modalService.open(ModalContentComponent);
            modalRef.componentInstance.content = {
              title: "Something went wrong",
              text: "Something went wrong. Please try again"
            };
          }
        );
  }

  login(email, password) {
    this.store.dispatch({ type: "LOG_IN" });
    return this.http
      .post(`${BASE_URL}users/login`, {
        email: email,
        password: password
      })
      .subscribe(
        response => {
          if (response.status === "404") {
            const modalRef = this.modalService.open(ModalContentComponent);
            modalRef.componentInstance.content = {
              title: "Wrong username or password",
              text: "You typed the wrong username or password. Please try again"
            };
          }
          if (response.accessToken) {
            this.store.dispatch({
              type: "LOG_IN_SUCCESS",
              payload: response.user
            });
            window.location.replace("/home");
            Storage.setToken(response.accessToken);
          }
        },
        error => {
          if (error.status === 404) {
            this.store.dispatch({ type: "LOG_IN_FAILED" });
            const modalRef = this.modalService.open(ModalContentComponent);
            modalRef.componentInstance.content = {
              title: "Wrong username or password",
              text: "You typed the wrong username or password. Please try again"
            };
          } else {
            this.store.dispatch({ type: "LOG_IN_FAILED" });
            const modalRef = this.modalService.open(ModalContentComponent);
            modalRef.componentInstance.content = {
              title: "Something went wrong",
              text: "Something went wrong. Please try again"
            };
          }
        }
      );
  }

  signOut() {
    Storage.removeToken();
    this.store.dispatch({ type: "SIGN_OUT" });
  }
}
