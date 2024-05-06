import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PasoDTO } from '../../../interfaces/PasoDTO';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {

  @Input() services: PasoDTO[] = [];

  currentServiceIndex = 0;
  showButtons = false;
  showModal = false;


  // services = [
  //   { name: 'Inicio', completed: false },
  //   { name: 'Inspeccion visual', completed: false },
  //   { name: 'Revision y recarga del sistema del aire acondicionado', completed: false },
  //   { name: 'Revision y recarga del sistema del aire acondicionado', completed: false },

  //   { name: 'Inspeccion visual', completed: false },




  //   { name: 'Fin', completed: false }
  // ];



  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  nextService() {
    if (this.currentServiceIndex < this.services.length) {
      this.services[this.currentServiceIndex].completado = true;
      this.currentServiceIndex++;
      //Se muestra en que servicio se encuentra
      console.log(this.currentServiceIndex);
    }
  }

  startOrder() {
    if (this.currentServiceIndex < this.services.length) {
      this.services[this.currentServiceIndex].completado = true;
      this.currentServiceIndex++;
      //Se muestra en que servicio se encuentra
      console.log(this.currentServiceIndex);
    }
    this.showButtons = true;
  }


  finishOrder() {
    if (this.currentServiceIndex < this.services.length) {
      this.services[this.currentServiceIndex].completado = true;
      this.currentServiceIndex = this.services.length;
      //Se muestra en que servicio se encuentra
      console.log(this.currentServiceIndex);
    }
  }




}
