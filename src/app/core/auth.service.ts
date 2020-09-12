import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: firebase.User;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate([""]);
  }

  isLoggedIn() {
    var isLogged = false;
    // (fixed) not working - refer to: 02_04
    if (this.user) {
      isLogged = true;
    } else {
      isLogged = false;
    }

    return isLogged;
  }
}
