import { Component } from '@angular/core';
import { Injectable, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  selected = false;
  canEdit = new EventEmitter<boolean>();

  addClass() {
    this.selected = !this.selected;
    this.canEdit.emit(this.selected);
  }

}
