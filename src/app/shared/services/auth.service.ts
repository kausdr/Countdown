// import { Injectable, NgZone } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import {
//   AngularFirestore,
//   AngularFirestoreDocument,
// } from '@angular/fire/compat/firestore';
// import { Router } from '@angular/router';
// import { User } from './user';
// import { GoogleAuthProvider } from 'firebase/auth';
// import { LoginModel } from '../../login/model/login.model';
// @Injectable({
//   providedIn: 'root',
// })

// export class AuthService {
//   // userData: User;
//   constructor(
//     public afAuth: AngularFireAuth,
//     public afs: AngularFirestore,
//     public ngZone: NgZone,
//     public router: Router,
//     public userData: User
//   ) {
//     /* Saving user data in localstorage when
//     logged in and setting up null when logged out */
//     this.afAuth.authState.subscribe((user) => {
//       if (user) {
//         userData = user;
//         localStorage.setItem('user', JSON.stringify(this.userData));
//         JSON.parse(localStorage.getItem('user')!);
//       } else {
//         localStorage.setItem('user', 'null');
//         JSON.parse(localStorage.getItem('user')!);
//       }
//     });
//   }
//   // Sign in with email/password
//   SignIn(login: LoginModel) {
//     return this.afAuth
//       .signInWithEmailAndPassword(login.email!, login.password!)
//       .then((result) => {
//         this.SetUserData(result.user);
//         this.afAuth.authState.subscribe((user) => {
//           if (user) {
//             this.router.navigate(['dashboard']);
//           }
//         });
//       })
//       .catch((error) => {
//         window.alert(error.message);
//       });
//   }
//   // Sign up with email/password
//   SignUp(login: LoginModel) {
//     return this.afAuth
//       .createUserWithEmailAndPassword(login.email!, login.password!)
//       .then((result) => {
//         /* Call the SendVerificaitonMail() function when new user sign
//         up and returns promise */
//         this.SendVerificationMail();
//         this.SetUserData(result.user);
//       })
//       .catch((error) => {
//         window.alert(error.message);
//       });
//   }
//   // Send email verfificaiton when new user sign up
//   SendVerificationMail() {
//     return this.afAuth.currentUser
//       .then((u: any) => u.sendEmailVerification())
//       .then(() => {
//         this.router.navigate(['verify-email-address']);
//       });
//   }
//   // Reset Forggot password
//   ForgotPassword(passwordResetEmail: string) {
//     return this.afAuth
//       .sendPasswordResetEmail(passwordResetEmail)
//       .then(() => {
//         window.alert('Password reset email sent, check your inbox.');
//       })
//       .catch((error) => {
//         window.alert(error);
//       });
//   }
//   // Returns true when user is looged in and email is verified
//   get isLoggedIn(): boolean {
//     const user = JSON.parse(localStorage.getItem('user')!);
//     return user !== null && user.emailVerified !== false ? true : false;
//   }
//   // Sign in with Google
//   GoogleAuth() {
//     return this.AuthLogin(new GoogleAuthProvider()).then((res: any) => {
//       this.router.navigate(['dashboard']);
//     });
//   }
//   // Auth logic to run auth providers
//   AuthLogin(provider: any) {
//     return this.afAuth
//       .signInWithPopup(provider)
//       .then((result) => {
//         this.router.navigate(['dashboard']);
//         this.SetUserData(result.user);
//       })
//       .catch((error) => {
//         window.alert(error);
//       });
//   }
//   /* Setting up user data when sign in with username/password,
//   sign up with username/password and sign in with social auth  
//   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
//   SetUserData(user: any) {
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(
//       `users/${user.uid}`
//     );
//     const userData: User = {
//       key: user.key,
//       username: user.username,
//       email: user.email,
//       password: user.password,
//     };
//     return userRef.set(userData, {
//       merge: true,
//     });
//   }
//   // Sign out
//   SignOut() {
//     return this.afAuth.signOut().then(() => {
//       localStorage.removeItem('user');
//       this.router.navigate(['sign-in']);
//     });
//   }
// }