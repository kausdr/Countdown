import { Component } from '@angular/core';
import { SignupService } from '../signup/service/signup.service';
import { SignupModel } from '../signup/model/signup.model';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { LoginDataService } from '../login/service/login-data.service';
import { LoginModel } from '../login/model/login.model';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent {

  loginData: LoginModel | null;

  showSuccessMessages = false;
  showErrorMessages = false;


  key?: string;
  signupForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  constructor(private loginService: LoginService, private signupService: SignupService, private router: ActivatedRoute, private loginDataService: LoginDataService,) {
    this.loginData = this.loginDataService.getLoginData();
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.signupService.loadSignup(paramMap.get('key')).subscribe(signup => {
          this.signupForm.controls.email.patchValue(signup.email);
        });
      }
    })
  }

  edit(): void {
    if (this.signupForm.invalid) {
      console.log('Formulário inválido');
      this.signupForm.markAllAsTouched();
      this.showErrorMessages = true;
      return;
    }

    if (this.key) {
      //codigo para alterar o produto
    } else {
      //codigo para salvar o produto
      var signup = new SignupModel();
      signup.username = this.signupForm.controls.username.value?.toString();
      signup.email = this.signupForm.controls.email.value?.toString();
      signup.password = this.signupForm.controls.password.value?.toString();

      if (this.loginData) {

        this.loginService.editAccount(this.loginData, signup).subscribe(retorno => {
          this.showSuccessMessages = true;
          console.log(retorno);
        });
      }
    }
  }
}




