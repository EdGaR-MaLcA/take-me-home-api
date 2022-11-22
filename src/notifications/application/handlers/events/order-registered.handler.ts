import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { OrderCreated } from 'src/orders/domain/events/order-created.event';

@EventsHandler(OrderCreated)
export class OrderRegisteredHandler implements IEventHandler<OrderCreated> {
  constructor() {}

  async handle(event: OrderCreated) {
    console.log('***Notifications-BC-Orders***');
    console.log(event);
  }
}