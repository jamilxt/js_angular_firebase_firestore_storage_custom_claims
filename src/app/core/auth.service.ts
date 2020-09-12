import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  logout() {
    this.afAuth.signOut();
    this.router.navigate([""]);
  }

  isLoggedIn() {
    // not working - refer to: 02_04
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    return true;
  }
}
