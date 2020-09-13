import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserProfile } from "./user-profile.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUser: firebase.User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
    afAuth.authState.subscribe((user) => {
      this.currentUser = user;
    });
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate([""]);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    var isLogged = false;
    // (fixed) not working - refer to: 02_04
    if (this.currentUser) {
      isLogged = true;
    } else {
      isLogged = false;
    }

    return isLogged;
  }

  createUserDocument() {
    // create the object with new data
    const userProfile: UserProfile = {
      uid: this.currentUser.uid,
      email: this.currentUser.email,
      name: this.currentUser.displayName,
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      specialty: "",
      ip: "",
    };

    // write to Cloud Firestore
    return this.angularFirestore
      .doc(`users/${this.currentUser.uid}`)
      .set(userProfile);
  }

  updateUserDocument(userProfile: UserProfile) {
    return this.angularFirestore
      .doc(`users/${userProfile.uid}`)
      .update(userProfile);
  }

  async routeOnLogin() {
    const user = this.afAuth.currentUser;
    const token = await (await user).getIdTokenResult();

    if (token.claims.admin) {
      this.router.navigate(["/users"]);
    } else {
      this.router.navigate([`/profile/${(await user).uid}`]);
    }
  }
}
