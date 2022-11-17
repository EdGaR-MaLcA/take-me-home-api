import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { BuyerRegistered } from '../../../../clients/domain/events/buyer-registered.event';

@EventsHandler(BuyerRegistered)
export class BuyerRegisteredHandler implements IEventHandler<BuyerRegistered> {
  constructor() {}

  async handle(event: BuyerRegistered) {
    console.log('***Notifications-BC***');
    console.log(event);
  }
}