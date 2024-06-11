import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../create-event/service/event.service';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{

  @Input() selectedCategoryId: string | null = null;
  public events: any;
  editEnabled: boolean = false;

  constructor(private eventService: EventService,
    private router: Router, private contentComponent: ContentComponent) { 
      this.contentComponent.canEdit.subscribe((status: boolean) => {
        this.editEnabled = status;
      });
    }

    // ngOnInit(): void {
    //   this.eventService.listar().subscribe(events => {
    //     console.log(events)
    //     this.events = events;
    //   });
    // }

    ngOnChanges(): void {
      if (this.selectedCategoryId !== null) {
        this.eventService.listarPorCategoria(this.selectedCategoryId).subscribe(events => {
          this.events = events;
          console.log(this.selectedCategoryId)
        });
      } else {
        this.eventService.listar().subscribe(events => {
          this.events = events;
          console.log(this.selectedCategoryId)
        });
      }
    }

    excluir(key: any) {
      console.log(key);
      this.eventService.excluir(key).then(retorno => {
        console.log(retorno);
      });
    }

    editar(key: any) {
      if (this.editEnabled) {
        console.log("editado");
        this.router.navigate(['/createEvent/'+key]);
      }

      
    }


    // editar(key: any) {
    //   this.router.navigate(['/layout/produto/'+key]);
    // }

}