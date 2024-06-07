import { Component } from '@angular/core';
import { Injectable, EventEmitter } from '@angular/core';
import { EditModeService } from './service/edit-mode.service';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  constructor(private editModeService: EditModeService) { }

  selected = false;
  canEdit = new EventEmitter<boolean>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.editModeService.getEditEnabled().pipe(
      takeUntil(this.destroy$)
    ).subscribe(currentEditMode => {
      if (currentEditMode) {
        this.addClass();
      } else {
        this.removeClass();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addClass() {
    this.selected = true;
    this.canEdit.emit(this.selected);
    console.log("editar ATIVADO")
  }

  removeClass() {
    this.selected = false;
    this.canEdit.emit(this.selected);
    console.log("remover classe ()")
  }
  

  toggleEditMode(): void {
    this.editModeService.getEditEnabled().pipe(
      take(1)
    ).subscribe(currentEditMode => {

      this.editModeService.setEditEnabled(!currentEditMode);

    });

}
}
