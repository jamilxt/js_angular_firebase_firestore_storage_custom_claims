import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

import {
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { UserProfile } from "../core/user-profile.model";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  item: Observable<UserProfile>;

  constructor(
    public afAuth: AngularFireAuth,
    public afService: AngularFirestore,
    public authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    this.itemDoc = this.afService.doc<UserProfile>(`users/${currentUser.uid}`);

    this.item = this.itemDoc.valueChanges();
  }
}
