import { Component } from '@angular/core';
import { AuthGuard } from './shared/authguard.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CountdownApplication';

  isLoggedIn: boolean = false;

  constructor(private authGuard: AuthGuard) {
    this.authGuard.loggedIn.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }
}
