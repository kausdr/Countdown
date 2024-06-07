import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditModeService {
  private editEnabledSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getEditEnabled(): Observable<boolean> {
    return this.editEnabledSubject.asObservable();
  }

  setEditEnabled(enabled: boolean): void {
    this.editEnabledSubject.next(enabled);
  }
}
