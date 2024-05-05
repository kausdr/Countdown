// login-data.service.ts
import { Injectable } from '@angular/core';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
  private loginData: LoginModel | null = null;

  setLoginData(login: LoginModel) {
    this.loginData = login;
  }

  getLoginData(): LoginModel | null {
    return this.loginData;
  }
}
