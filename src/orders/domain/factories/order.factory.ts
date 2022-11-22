import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { OrderId } from '../aggregates/order/order-id.value';
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';
import { OrderOrigin } from '../enums/order-origin.values';
import { OrderDestination } from '../enums/order-destination.values';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { Order } from '../aggregates/order/order.entity';

export class OrderFactory {
    
    public static withId(orderId: OrderId,cliendId: ClientId, origin: OrderOrigin, destination: OrderDestination, maxDate: DateTime, auditTrail: AuditTrail): Order {
        let order: Order = new Order(cliendId, origin, destination, maxDate, auditTrail);
        order.changeId(orderId);
        return order;
    }

    public static create(cliendId: ClientId, origin: OrderOrigin, destination: OrderDestination, maxDate: DateTime, auditTrail: AuditTrail): Order {
        return new Order(cliendId, origin, destination, maxDate, auditTrail);
        
    }

}