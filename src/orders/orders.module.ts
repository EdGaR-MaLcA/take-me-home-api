import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRegisteredHandler } from 'src/notifications/application/handlers/events/order-registered.handler';
import { RegisterOrderHandler } from './application/handlers/commands/register-order.handler';
import { GetOrdersHandler } from './application/handlers/queries/get-orders.handler';
import { OrderApplicationService } from './application/services/order-application.service';
import { RegisterOrderValidator } from './application/validators/register-order.validator';
import { ORDER_REPOSITORY } from './domain/aggregates/order/order.repository';
import { OrderEntity } from './infrastructure/persistance/entities/order.entity';
import { OrderEntityRepository } from './infrastructure/persistance/repositories/order.repository';
import { OrderController } from './interface/rest/order.controller';

export const CommandHandlers = [RegisterOrderHandler];
export const EventHandlers = [OrderRegisteredHandler];
export const QueryHandlers = [GetOrdersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [OrderController],
  providers: [ 
    { useClass: OrderEntityRepository, provide: ORDER_REPOSITORY },
    OrderApplicationService,
    RegisterOrderValidator,
    OrderEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class OrdersModule {}
