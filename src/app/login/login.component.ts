import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from './service/login.service';
import { LoginModel } from './model/login.model';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../shared/authguard.guard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  loginForm = new FormGroup ({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  constructor(private loginService: LoginService, private router: Router, private authGuard: AuthGuard) { }


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


    var login = new LoginModel();

    login.email = this.loginForm.controls.email.value?.toString();

    console.log('Formulário válido');

    this.loginService.checkLoginExists(login).subscribe((exists: boolean) => {
      if (exists) {
        this.showSuccessMessages = true
        this.authGuard.login();
        console.log('O email existe no banco de dados.');
      } else {
        this.showErrorMessages = true
        console.log('O email não existe no banco de dados.');
      }
    });

  }
}



