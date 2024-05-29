import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EventModel } from '../model/event.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private db: AngularFireDatabase) { }

  salvar(produto: EventModel) { 
    return this.db.list('event').push(produto);   
  }

  excluir(key: any) {
    return this.db.object('event/'+key).remove();
  }

  carregar(key: any) : Observable<any> {
    return this.db.object('event/'+key).valueChanges();
  }

  alterar(key: any, produto: EventModel) {
    return this.db.object('event/'+key).update(produto);
  }

  listar() {
    return this.db.list('event').snapshotChanges()
    .pipe(
      map(changes => {
        console.log(changes);
        return changes.map(c => ({ key: c.key, 
          ...c.payload.val() as EventModel}));
      })
    );
  }

}
