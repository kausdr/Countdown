import { Component } from '@angular/core';
import { ContentComponent } from '../content/content.component';
import { CategoryService } from '../create-category/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent{

  editEnabled: boolean = false;
  public categories: any;

  selectedCategory: any | null = null;

  constructor(private categoryService: CategoryService ,private contentComponent: ContentComponent, private router: Router,) { 
      this.contentComponent.canEdit.subscribe((status: boolean) => {
        this.editEnabled = status;
      });
    }

    ngOnInit(): void {
      this.categoryService.listar().subscribe(categories => {
        console.log(categories)
        this.categories = categories;
      });
    }

    selectCategory(category: any) {
      this.selectedCategory = category;
    }
  
    isSelected(category: any) {
      return category === this.selectedCategory;
    }

    editar(key: any) {
      if (this.editEnabled) {
        console.log("editado");
        this.router.navigate(['/createCategory/'+key]);
      }

      
    }

    

}
