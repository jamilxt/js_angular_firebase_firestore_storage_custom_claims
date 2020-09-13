import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserProfile } from "./user-profile.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: firebase.User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afService: AngularFirestore
  ) {
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

  createUserDocument() {
    // get the current user
    const currentUser = this.user;

    // create the object with new data
    const userProfile: UserProfile = {
      uid: currentUser.uid,
      email: currentUser.email,
      name: currentUser.displayName,
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      specialty: "",
      ip: "",
    };

    // write to Cloud Firestore
    return this.afService.doc(`user/${currentUser.uid}`).set(userProfile);
  }
}
