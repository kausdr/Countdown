import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { EventService } from './service/event.service';
import { LoginDataService } from '../login/service/login-data.service';
import { LoginModel } from '../login/model/login.model';
import { EventModel } from './model/event.model';
import { AuthGuard } from '../shared/authguard.guard';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'; 
import { CategoryService } from '../create-category/service/category.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  showSuccessMessages = false;
  showErrorMessages = false;
  daysLeft: number = 0
  categories: any[] = [];
  selectedCategory: any | null = null;


  key?: string;
  paramKey: string | null = null;

  formGroup = new FormGroup({
    nome: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required])
  })
  

  constructor(private eventService: EventService, private router: ActivatedRoute, private routerN: Router, private authGuard: AuthGuard, private route: ActivatedRoute, private categoryService: CategoryService,) { 

  }

  isEditMode: boolean = false;

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.eventService.carregar(this.key).subscribe(event => {
          this.formGroup.controls.nome.patchValue(event.nome);
          this.formGroup.controls.date.patchValue(event.date);
          this.selectedCategory = event.category;
          this.calculateDaysLeft(event.date);
        });
      }
    })

    this.categoryService.listar().subscribe(categories => {
      this.categories = categories;
    });

    this.checkUrl()
    

    
  }

  checkUrl() {
    this.paramKey = this.route.snapshot.paramMap.get('key')
    this.isEditMode = this.paramKey != null
  }

  salvar(): void {
    if (this.formGroup.invalid) {
      console.log('Formulário inválido');
      this.formGroup.markAllAsTouched();
      this.showErrorMessages = true;
      return;
    }

    var event = new EventModel();
    event.nome = this.formGroup.controls.nome.value?.toString();
    event.date = this.formGroup.controls.date?.value?.toString();
    event.category = this.selectedCategory;

    this.calculateDaysLeft(event.date);
    event.dias = this.daysLeft;

    if (this.key) {
      this.eventService.alterar(this.key, event).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    } else {
      this.eventService.salvar(event).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
    
      });

      
    }
    this.authGuard.home();
  }

  selectCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    console.log(this.selectedCategory);
  }

  excluir(key: any) {
    console.log(key);
    this.eventService.excluir(key).then(retorno => {
      console.log(retorno);
    });

    this.authGuard.home();
  }

  calculateDaysLeft(eventDate: string | undefined): void {
    if (!eventDate) {
      this.daysLeft = 0;
      return;
    }

    const currentDate = new Date();
    const eventDateObj = new Date(eventDate);

    const differenceInTime = eventDateObj.getTime() - currentDate.getTime();

    this.daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  }

}
