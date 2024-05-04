import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  options: string[] = ['🎸', '🎉', '🪭', '🛍️'];
  selectedOption: string | null = null;

  selectOption(option: string) {
    this.selectedOption = option;
    
    console.log('Selected option:', option);

  }
}
