import { Component } from '@angular/core';
import { SignupService } from './service/signup.service';
import { SignupModel } from './model/signup.model';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  signupForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  constructor(private signupService: SignupService, private router: ActivatedRoute) { }

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

  signup(): void {
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

      this.signupService.saveSignup(signup).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    }
  }
}



