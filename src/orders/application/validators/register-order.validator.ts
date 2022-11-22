import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/orders/domain/aggregates/order/order.entity';
import { OrderRepository, ORDER_REPOSITORY } from 'src/orders/domain/aggregates/order/order.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterOrderRequest } from '../dtos/request/register-order-request.dto';
import { RegisterOrder } from '../messages/commands/register-order.command';
 

@Injectable()
export class RegisterOrderValidator {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private orderRepository: OrderRepository,
  ) {
  }
  //we have to import ORDER REPOSITORY from the domain layer zzzz

  public async validate(registerOrder: RegisterOrder,): Promise<AppNotification> {

    let notification: AppNotification = new AppNotification();

    const clientId: number = registerOrder.client_id;
    
    if (isNaN(clientId)) {
        notification.addError('Send a valid clientId', null);
    }
 
    const origin: string = registerOrder.origin ? registerOrder.origin.trim() : '';
    if (origin.length <= 0) {
        notification.addError('origin is required', null);
    }
 
    const destination: string = registerOrder.destination ? registerOrder.destination.trim() : '';
    if (destination.length <= 0) {
        notification.addError('destination is required', null);
    }
     
    if (notification.hasErrors()) {
      return notification;
    }
    
    return notification;
  
}
}