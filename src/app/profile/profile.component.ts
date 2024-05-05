import { Component } from '@angular/core';
import { LoginService } from '../login/service/login.service';
import { LoginDataService } from '../login/service/login-data.service';
import { LoginModel } from '../login/model/login.model';
import { AuthGuard } from '../shared/authguard.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  loginData: LoginModel | null;

  constructor(private loginService: LoginService, private loginDataService: LoginDataService, private authGuard: AuthGuard) {

    this.loginData = this.loginDataService.getLoginData();

   }


   logout(): void {
    this.authGuard.logout();
   }
   

   delete(): void {
    if (this.loginData) {
      this.loginService.deleteAccount(this.loginData).subscribe(retorno => {
        console.log(retorno);
      });
    }
  }

}
