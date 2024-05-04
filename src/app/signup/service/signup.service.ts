import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupModel } from '../model/signup.model'; 
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private db: AngularFireDatabase) { }

  saveSignup(signup: SignupModel) {
    return this.db.list('signup').push(signup);
  }

  deleteSignup(key: any) {
    return this.db.object('signup/'+key).remove();
  }

  loadSignup(key: any) : Observable<any> {
    return this.db.object('signup/'+key).valueChanges();
  }

  listSignup(){
    return this.db.list('signup').snapshotChanges()
    .pipe(
      map( changes => {
        return changes.map(c => ({ key: c.payload.key,
          ...c.payload.val() as SignupModel}));
        })
      );
  }
}
