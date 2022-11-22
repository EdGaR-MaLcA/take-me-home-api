import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { ChildEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ClientIdValue } from '../values/client-id.value';
import { DateTimeValue } from '../values/date-time.value';
import { OrderDestinationValue } from '../values/order-destination.value';
import { OrderOriginValue } from '../values/order-origin.value';

@Entity('orders')
export class OrderEntity  {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;
    @Column((type) => ClientIdValue, { prefix: false })
    public client_id: ClientIdValue;

    @Column((type) => OrderOriginValue, { prefix: false })
    public origin: OrderOriginValue;

    @Column((type) => OrderDestinationValue, { prefix: false })
    public destination: OrderDestinationValue;

    @Column((type) => DateTimeValue, { prefix: false })
    public max_date: DateTimeValue;
    
    @Column((type) => AuditTrailValue, { prefix: false })
    public auditTrail: AuditTrailValue;

}