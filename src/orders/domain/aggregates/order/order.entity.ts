import { AggregateRoot } from '@nestjs/cqrs'; 
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { AuditTrail } from '../../../../shared/domain/values/audit-trail.value';
import { OrderDestination } from '../../enums/order-destination.values';
import { OrderOrigin } from '../../enums/order-origin.values';
import { OrderCreated } from '../../events/order-created.event';
import { OrderId } from './order-id.value';
 
export class Order extends AggregateRoot {
  private id: OrderId;
  private clientId: ClientId;
  private origin: OrderOrigin;
  private destination: OrderDestination;
  private maxDate: DateTime;
  private auditTrail: AuditTrail;

  public constructor(clientId: ClientId, origin: OrderOrigin, destination: OrderDestination, maxDate: DateTime, auditTrail: AuditTrail) {
    super();
    this.clientId = clientId;
    this.origin = origin;
    this.destination = destination;
    this.maxDate = maxDate;
    this.auditTrail = auditTrail;
  }

  public register() {
    const event = new OrderCreated(this.id.getValue(), this.clientId.getValue(), this.origin.getOrigin(), this.destination.getDestination(), this.maxDate.getValue());
    this.apply(event);
  }


  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: OrderId) {
    this.id = id;
  }

  public getId(): OrderId {
    return this.id;
  }

    public getClientId(): ClientId {
        return this.clientId;
    }

    public getOrigin(): OrderOrigin {
        return this.origin;
    }

    public getDestination(): OrderDestination {
        return this.destination;
    }

    public getMaxDate(): DateTime {
        return this.maxDate;
    }


}