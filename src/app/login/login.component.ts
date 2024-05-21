import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from './service/login.service';
import { LoginModel } from './model/login.model';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../shared/authguard.guard';
import { LoginDataService } from './service/login-data.service';
// import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  constructor(private loginService: LoginService, private router: Router, private authGuard: AuthGuard, private loginDataService: LoginDataService, public afAuth: AngularFireAuth,) { }


  ngOnInit(): void {
  }

 

  login(): void {
    console.log("fazendo login")

    // console.log(this.loginForm.controls.email.invalid);
    // console.log(this.loginForm.controls.email.touched); 

    if (this.loginForm.invalid) {
      console.log('Formulário inválido');
      this.loginForm.markAllAsTouched();
      this.showErrorMessages = true;
      return;
    }

    // login() {
    //   if (this.loginForm.valid) {
    //     this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
    //   }
    // }


    var login = new LoginModel();

    login.email = this.loginForm.controls.email.value?.toString();
    login.password = this.loginForm.controls.password.value?.toString();

    console.log('Formulário válido');

    this.afAuth
      .signInWithEmailAndPassword(login.email!, login.password!)


    // this.loginService.checkLoginExists(login).subscribe((exists: boolean) => {
    //   if (exists) {
    //     this.loginDataService.setLoginData(login);
    //     this.showSuccessMessages = true
    //     this.authGuard.login();
    //     console.log('O email existe no banco de dados.');
    //   } else {
    //     this.showErrorMessages = true
    //     console.log('O email não existe no banco de dados.');
    //   }
    // });

  }
}



