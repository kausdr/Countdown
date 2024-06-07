import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { CategoryService } from './service/category.service';
import { LoginDataService } from '../login/service/login-data.service';
import { LoginModel } from '../login/model/login.model';
import { EventModel } from '../create-event/model/event.model';
import { AuthGuard } from '../shared/authguard.guard';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryModel } from '../category/model/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})


export class CreateCategoryComponent {

  options: string[] = ['🎸', '🎉', '🪭', '🛍️'];
  selectedOption: string | null = null;

  selectOption(option: string) {
    this.selectedOption = option;

    console.log('Selected option:', option);

  }

  showSuccessMessages = false;
  showErrorMessages = false;


  key?: string;
  paramKey: string | null = null;

  formGroup = new FormGroup({
    nome: new FormControl("", [Validators.required])
  })


  constructor(private categoryService: CategoryService, private router: ActivatedRoute, private routerN: Router, private authGuard: AuthGuard, private route: ActivatedRoute) {

  }

  isEditMode: boolean = false;

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.categoryService.carregar(this.key).subscribe(category => {
          this.formGroup.controls.nome.patchValue(category.nome);
          this.selectedOption = category.icon;
        });
      }
    })


    this.checkUrl()



  }

  checkUrl() {
    this.paramKey = this.route.snapshot.paramMap.get('key')
    this.isEditMode = this.paramKey != null
  }

  salvar(): void {
    if (this.selectedOption == null || this.formGroup.invalid) {
      console.log('Formulário inválido');
      this.showErrorMessages = true;
      return;
    }

      var category = new CategoryModel();
      category.icon = this.selectedOption
      category.nome = this.formGroup.controls.nome.value?.toString();

      if (this.key) {
        //codigo para alterar o produto
        this.categoryService.alterar(this.key, category).then(result => {
          this.showSuccessMessages = true;
          console.log(result);
        });
      } else {
        //codigo para salvar o produto
        this.categoryService.salvar(category).then(result => {
          this.showSuccessMessages = true;
          console.log(result);

        });

        this.authGuard.home();

    }


  }

  excluir(key: any) {
    console.log(key);
    this.categoryService.excluir(key).then(retorno => {
      console.log(retorno);
    });

    this.authGuard.home();
  }

}
