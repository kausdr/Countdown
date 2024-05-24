import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './service/event.service';
import { LoginDataService } from '../login/service/login-data.service';
import { LoginModel } from '../login/model/login.model';
import { EventModel } from './model/event.model';
import { AuthGuard } from '../shared/authguard.guard';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  showSuccessMessages = false;
  showErrorMessages = false;


  key?: string;
  formGroup = new FormGroup({
    nome: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required])
  })

  constructor(private eventService: EventService, private router: ActivatedRoute, private routerN: Router, private authGuard: AuthGuard) { 

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.eventService.carregar(this.key).subscribe(event => {
          this.formGroup.controls.nome.patchValue(event.nome);
          this.formGroup.controls.date.patchValue(event.date);
        });
      }
    })
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

    if (this.key) {
      //codigo para alterar o produto
    } else {
      //codigo para salvar o produto
      this.eventService.salvar(event).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
        
      });

      this.authGuard.login();
    }
  }

}
