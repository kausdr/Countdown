import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../model/login.model';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFireDatabase) { }

  checkLoginExists(login: LoginModel) : Observable<boolean>{
    return new Observable<boolean>((observer) => {
      this.db.list('signup', ref => ref.orderByChild('email').equalTo(login.email!)).valueChanges().subscribe((signups: any[]) => {
        observer.next(signups.length > 0);
        observer.complete();

      });
    });
  }
}
