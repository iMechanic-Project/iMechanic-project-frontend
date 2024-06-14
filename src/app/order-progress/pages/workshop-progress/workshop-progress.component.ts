import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { NgForOf, NgIf } from '@angular/common';
import { MultiProgressBarComponent } from '../multi-progress-bar/multi-progress-bar.component';
import { OrderDetailDTO } from '../../../interfaces/OrderDetailDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';
import { OrderService } from '../../../services/order.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-workshop-progress',
  standalone: true,
  imports: [
    ProgressBarComponent,
    NgForOf,
    NgIf,
    MultiProgressBarComponent,
    RouterLink,
  ],
  templateUrl: './workshop-progress.component.html',
  styles: '',
})
export default class WorkshopProgressComponent implements OnInit, OnDestroy {
  orders: OrderDetailDTO = {
    workOrderId: '',
    nameWorkshop: '',
    addressWorkshop: '',
    phoneWorkShop: '',
    operationDetails: [
      {
        operation: {
          id: 0,
          name: '',
        },
        mechanic: {
          id: 0,
          name: '',
        },
        statusOperation: '',
        steps: [],
      },
    ],
  };

  mecanicoPaso: MecanicoPasoDTO = {
    workOrderId: '',
    mechanicId: 0,
    operationId: 0,
    operationName: '',
    stepId: 0,
    complete: false,
  };

  private stepCompletedSubscription: Subscription | null = null;
  private intervalSubscription: Subscription | null = null;


  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    console.log("Component initialized");

    this.route.params.subscribe((params) => {
      const orderId = params['id'];
      if (orderId) {
        this.fetchOrderDetails(orderId);

        this.stepCompletedSubscription = this.orderService.stepCompletedSubject.subscribe(
          (completedOrderId) => {
            if (completedOrderId === orderId) {
              this.fetchOrderDetails(orderId);
            }
          }
        );

        // Usar interval para ejecutar fetchOrderDetails cada 2 segundos
        this.intervalSubscription = interval(2000).subscribe(() => {
          this.fetchOrderDetails(orderId);
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.stepCompletedSubscription) {
      this.stepCompletedSubscription.unsubscribe();
    }
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  fetchOrderDetails(orderId: string): void {
    this.orderService.orderDetailByTaller(orderId).subscribe(
      (orderDetail) => {
        this.orders = orderDetail;
        console.log(orderDetail);
        this.orders.operationDetails.forEach((servicioDetalle) => {
          this.mecanicoPaso.workOrderId = this.orders.workOrderId;
          this.mecanicoPaso.mechanicId = servicioDetalle.mechanic.id;
          this.mecanicoPaso.operationId = servicioDetalle.operation.id;
          this.mecanicoPaso.operationName = servicioDetalle.operation.name;
        });
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  goBack(): void {
    window.history.back();
  }

}







