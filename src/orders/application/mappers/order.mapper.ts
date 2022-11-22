import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';
import { DniValue } from 'src/clients/infrastructure/persistence/values/dni.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { RegisterOrderRequest } from '../dtos/request/register-order-request.dto';
import { RegisterOrder } from '../messages/commands/register-order.command';
import { Order } from 'src/orders/domain/aggregates/order/order.entity';
import { RegisterOrderResponse } from '../dtos/response/register-order-response.dto';
import { OrderFactory } from 'src/orders/domain/factories/order.factory';
import { OrderOrigin } from 'src/orders/domain/enums/order-origin.values';
import { OrderDestination } from 'src/orders/domain/enums/order-destination.values';
import { OrderEntity } from 'src/orders/infrastructure/persistence/entities/order.entity';
import { ClientIdValue } from 'src/orders/infrastructure/persistence/values/client-id.value';
import { OrderOriginValue } from 'src/orders/infrastructure/persistence/values/order-origin.value';
import { OrderDestinationValue } from 'src/orders/infrastructure/persistence/values/order-destination.value';
import { DateTimeValue } from 'src/orders/infrastructure/persistence/values/date-time.value';
import { OrderId } from 'src/orders/domain/aggregates/order/order-id.value';
import { OrderDto } from '../dtos/response/order.dto';

export class OrderMapper {
  public static dtoRequestToCommand(registerOrderRequest: RegisterOrderRequest) {
    return new RegisterOrder(
      registerOrderRequest.client_id,
      registerOrderRequest.origin,
      registerOrderRequest.destination,
      registerOrderRequest.max_date 
    );
  }

  public static domainToDtoResponse(order: Order) {
  
    return new RegisterOrderResponse(
      order.getId().getValue(),
      order.getClientId().getValue(),
      order.getOrigin().getOrigin(),
      order.getDestination().getDestination(),
      order.getMaxDate().getValue(),
      order.getAuditTrail().getCreatedAt().format(),
      order.getAuditTrail().getCreatedBy().getValue(),
    );
  }
  
  public static commandToDomain(command: RegisterOrder, userId: number): Order {

    const clientId: ClientId = ClientId.of(command.client_id);
    const origin: OrderOrigin = OrderOrigin.create(command.origin);
    const destination: OrderDestination = OrderDestination.create(command.destination);
    const max_date: DateTime = DateTime.fromString(command.max_date);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );

    let order: Order = OrderFactory.create(clientId,origin, destination, max_date, auditTrail);
    return order;
  }
  
  
  public static domainToEntity(order: Order): OrderEntity {

    const orderEntity: OrderEntity = new OrderEntity();

    orderEntity.origin = OrderOriginValue.from(order.getOrigin().getOrigin());
    orderEntity.destination = OrderDestinationValue.from(order.getDestination().getDestination());
    orderEntity.max_date = DateTimeValue.from(order.getMaxDate().getValue());
    
    const createdAt: string = order.getAuditTrail() != null && order.getAuditTrail().getCreatedAt() != null ? order.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = order.getAuditTrail() != null && order.getAuditTrail().getCreatedBy() != null ? order.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = order.getAuditTrail() != null && order.getAuditTrail().getUpdatedAt() != null ? order.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = order.getAuditTrail() != null && order.getAuditTrail().getUpdatedBy() != null ? order.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    
    orderEntity.client_id = ClientIdValue.from(order.getClientId().getValue());
    orderEntity.auditTrail = auditTrailValue;
 
    return orderEntity;
  }

  public static entityToDomain(orderEntity: OrderEntity): Order {
    if (orderEntity == null) return null;

    const origin: OrderOrigin = OrderOrigin.create(orderEntity.origin.origin);
    const destination: OrderDestination = OrderDestination.create(orderEntity.destination.destination);
    const max_date: DateTime = DateTime.fromString(orderEntity.max_date.max_date);
    
    const auditTrail: AuditTrail = AuditTrail.from(
      orderEntity.auditTrail.createdAt != null ? DateTime.fromString(orderEntity.auditTrail.createdAt) : null,
      orderEntity.auditTrail.createdBy != null ? UserId.of(orderEntity.auditTrail.createdBy) : null,
      orderEntity.auditTrail.updatedAt != null ? DateTime.fromString(orderEntity.auditTrail.updatedAt) : null,
      orderEntity.auditTrail.updatedBy != null ? UserId.of(orderEntity.auditTrail.updatedBy) : null
      );
      
    const id: OrderId = OrderId.of(orderEntity.id);  
    const client_id: ClientId = ClientId.of(orderEntity.client_id.client_id);
    let order: Order = OrderFactory.withId(id, client_id, origin, destination, max_date, auditTrail);
    return order;
  }

    public static ormToOrderDto(row: any): OrderDto {

      let dto = new OrderDto();
    dto.id = Number(row.id);
    dto.client_id = Number(row.client_id);
    dto.origin = row.origin;
    dto.destination = row.destination;
    dto.max_date = row.max_date;

    return dto;
    }

}