import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { map } from "rxjs/operators";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([""]);
const redirectLoggedInToProfile = () =>
  map((user) => (user ? ["profile", (user as any).uid] : true));

const onlyAllowSelf = (next) =>
  map((user) => (!!user && next.params.id == (user as any).uid) || [""]);

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    // (bug) using these below two lines - after clicking on logout - it's not redirecting to the homepage
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfile },
  },
  {
    path: "profile/:id",
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: onlyAllowSelf },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
