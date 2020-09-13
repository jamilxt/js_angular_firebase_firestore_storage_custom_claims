import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

import {
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { UserProfile } from "../core/user-profile.model";
import { AuthService } from "../core/auth.service";
import { NgForm } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { ActivatedRoute } from "@angular/router";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  item: Observable<UserProfile>;

  uid: string;
  loading = false;
  error: string;

  downloadURL: Observable<string>;
  //  downloadUrl = "asseets/profile-placeholder.png";
  uploadProgress: Observable<number>;

  constructor(
    public afAuth: AngularFireAuth,
    public angularFirestore: AngularFirestore,
    private route: ActivatedRoute,
    private authService: AuthService,
    private angularFireStorage: AngularFireStorage
  ) {
    this.uid = this.route.snapshot.paramMap.get("id");
    this.downloadURL = this.angularFireStorage
      .ref(`users/${this.uid}/profile-image`)
      .getDownloadURL();
  }

  ngOnInit() {
    this.itemDoc = this.angularFirestore.doc<UserProfile>(`users/${this.uid}`);
    this.item = this.itemDoc.valueChanges();
  }

  async onSubmit(ngForm: NgForm) {
    this.loading = true;

    const {
      email,
      name,
      address,
      city,
      state,
      zip,
      ip,
      phone,
      specialty,
    } = ngForm.form.getRawValue();

    const userProfile: UserProfile = {
      uid: this.uid,
      email,
      name,
      address,
      city,
      state,
      zip,
      ip,
      phone,
      specialty,
    };

    try {
      await this.authService.updateUserDocument(userProfile);
    } catch (error) {
      console.log(error.message);
      this.error = error.message;
    }

    this.loading = false;
  }

  fileChange(event) {
    this.downloadURL = null;
    this.error = null;

    // get the file
    const file = event.target.files[0];

    // create the file reference
    const filePath = `users/${this.uid}/profile-image`;
    const fileRef = this.angularFireStorage.ref(filePath);

    // upload and store the task
    const task = this.angularFireStorage.upload(filePath, file);
    task.catch((error) => (this.error = error.message));

    // Observer percentage changes
    this.uploadProgress = task.percentageChanges();

    // get notified when the download URL is avaiable
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
        })
      )
      .subscribe();
  }
}
