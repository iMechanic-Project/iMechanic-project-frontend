import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PasoDTO } from '../../../interfaces/PasoDTO';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';
import { MechanicService } from '../../../services/mechanic.service';

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
export class ProgressBarComponent implements OnInit {

  @Input() mecanicoPaso: MecanicoPasoDTO = {
    ordenTrabajoId: 0,
    mecanicoId: 0,
    servicioId: 0,
    servicioNombre: '',
    pasoId: 0,
    complete: false
  };
  @Input() pasos: PasoDTO[] = [];

  currentServiceIndex = 0;
  showButtons = false;
  showModal = false;

  constructor(private mechanicService: MechanicService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.mechanicService.getStepComplete(this.mecanicoPaso.ordenTrabajoId, this.mecanicoPaso.servicioId).subscribe((pasosCompletados: PasoDTO[]) => {
        this.pasos.forEach((paso: PasoDTO) => {
          const completado = pasosCompletados.find((pasoCompletado: PasoDTO) => pasoCompletado.id === paso.id);
          if (completado) {
            paso.completado = true;
          }
        });
  
        const ultimoPasoCompletadoIndex = this.pasos.findIndex((paso: PasoDTO) => !paso.completado);
        this.currentServiceIndex = ultimoPasoCompletadoIndex === -1 ? this.pasos.length : ultimoPasoCompletadoIndex;
        this.showButtons = this.currentServiceIndex < this.pasos.length;
      });
    }, 1000); // 4000 milisegundos = 4 segundos
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  nextStep() {
    if (this.currentServiceIndex < this.pasos.length) {
      const paso = this.pasos[this.currentServiceIndex];
      this.mechanicService.completeStep(this.mecanicoPaso.ordenTrabajoId, this.mecanicoPaso.servicioId, paso.id)
        .subscribe((response) => {
          console.log('Paso completado:', response);
          paso.completado = true;
          this.currentServiceIndex++;
          //Se muestra en que servicio se encuentra
          console.log(this.currentServiceIndex);
        }, (error) => {
          console.error('Error al completar el paso:', error);
        });
    }
  }

  startOrder() {
    this.nextStep();
    if (this.currentServiceIndex < this.pasos.length) {
      this.pasos[this.currentServiceIndex].completado = true;
      this.currentServiceIndex++;
      //Se muestra en que servicio se encuentra
      console.log(this.currentServiceIndex);
    }
    this.showButtons = true;
  }


  finishOrder() {
    if (this.currentServiceIndex < this.pasos.length) {
      this.pasos[this.currentServiceIndex].completado = true;
      this.currentServiceIndex = this.pasos.length;
      //Se muestra en que servicio se encuentra
      console.log(this.currentServiceIndex);
    }
  }

}