import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Order } from 'src/orders/domain/aggregates/order/order.entity';
import { OrderRepository, ORDER_REPOSITORY } from 'src/orders/domain/aggregates/order/order.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterOrderRequest } from '../dtos/request/register-order-request.dto';
import { RegisterOrderResponse } from '../dtos/response/register-order-response.dto';
import { OrderMapper } from '../mappers/order.mapper';
import { RegisterOrder } from '../messages/commands/register-order.command';
import { RegisterOrderValidator } from '../validators/register-order.validator';

@Injectable()
export class OrderApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerOrderValidator: RegisterOrderValidator,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}
  
  async register( registerOrderRequest: RegisterOrderRequest, ): Promise<Result<AppNotification, RegisterOrderResponse>> {
   
    const registerOrder: RegisterOrder = OrderMapper.dtoRequestToCommand(registerOrderRequest);
    const notification: AppNotification = await this.registerOrderValidator.validate(registerOrder);
    if (notification.hasErrors()) {
        return Result.error(notification);
    }
    const order: Order = await this.commandBus.execute(registerOrder);
    const response: RegisterOrderResponse = OrderMapper.domainToDtoResponse(order);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.orderRepository.getById(id);
  }
}