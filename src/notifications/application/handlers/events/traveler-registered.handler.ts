import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TravelerRegistered } from '../../../../clients/domain/events/traveler-registered.event';

@EventsHandler(TravelerRegistered)
export class TravelerRegisteredHandler implements IEventHandler<TravelerRegistered> {
  constructor() {}

  async handle(event: TravelerRegistered) {
    console.log(event);
  }
}