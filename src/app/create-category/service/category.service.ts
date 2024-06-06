import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoryModel } from '../../category/model/category.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  salvar(category: CategoryModel) { 
    return this.db.list('category').push(category);
  }

  excluir(key: any) {
    return this.db.object('event/'+key).remove();
  }

  carregar(key: any) : Observable<any> {
    return this.db.object('event/'+key).valueChanges();
  }

  alterar(key: any, produto: CategoryModel) {
    return this.db.object('event/'+key).update(produto);
  }

  listar() {
    return this.db.list('category').snapshotChanges()
    .pipe(
      map(changes => {
        console.log(changes);
        return changes.map(c => ({ key: c.key, 
          ...c.payload.val() as CategoryModel}));
      })
    );
  }

}
