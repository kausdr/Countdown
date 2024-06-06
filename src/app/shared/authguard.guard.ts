import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router) {}

  private isAuthenticated = false;
  loggedIn = new EventEmitter<boolean>();
  editting = new EventEmitter<boolean>();

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true; 
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  edit(): void {
    this.isAuthenticated = true;
    this.editting.emit(true);
    this.router.navigate(['/editAccount']);
  }

  login(): void {
    this.isAuthenticated = true;
    this.loggedIn.emit(true);
    this.router.navigate(['/content']);
  }

  home(): void {
    this.router.navigate(['/content']);
  }

  logout(): void {
    this.isAuthenticated = false;
    this.loggedIn.emit(false);
    this.router.navigate(['/login']);
  }
}
