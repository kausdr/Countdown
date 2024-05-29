import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../create-event/service/event.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  public events: any;

  constructor(private eventService: EventService,
    private router: Router) { }

    ngOnInit(): void {
      this.eventService.listar().subscribe(events => {
        console.log(events)
        this.events = events;
      });
    }


    excluir(key: any) {
      console.log(key);
      this.eventService.excluir(key).then(retorno => {
        console.log(retorno);
      });
    }


    editar(key: any) {
      this.router.navigate(['/layout/produto/'+key]);
    }

}
