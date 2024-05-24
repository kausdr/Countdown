import { Injectable } from '@angular/core';
import { LoginModel } from '../model/login.model';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SignupModel } from '../../signup/model/signup.model';
import { take } from 'rxjs';

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


  editAccount(login: LoginModel ,signup: SignupModel): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.db.list('signup', ref => ref.orderByChild('email').equalTo(login.email!)).snapshotChanges().subscribe((changes: any[]) => {
        changes.forEach(change => {
          const key = change.payload.key;
          console.log(key);
          this.db.object(`signup/${key}`).update(signup)
            .then(() => {
              observer.next(true);
              observer.complete();
            })
            .catch((error: any) => {
              console.error('Erro ao atualizar:', error);
              observer.error(error);
            });
        });
      });
    });
  }


  deleteAccount(search: LoginModel) {
    return new Observable<any>((observer) => {
      this.db.list('signup', ref => ref.orderByChild('email').equalTo(search.email!)).snapshotChanges()
        .pipe(take(1)) 
        .subscribe((changes: any[]) => {
          changes.forEach(change => {
            const key = change.payload.key;
            console.log(key); 
            this.db.object(`signup/${key}`).remove()
              .then(() => {
                observer.next(true);
                observer.complete();
              })
              .catch((error: any) => {
                console.error('Erro ao excluir:', error);
                observer.error(error);
              });
          });
        });
    });
  }
  
}
