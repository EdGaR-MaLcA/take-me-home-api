import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterOrder } from '../../messages/commands/register-order.command';
import { OrderMapper } from '../../mappers/order.mapper';
import { Inject } from '@nestjs/common';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';
import { OrderRepository, ORDER_REPOSITORY } from 'src/orders/domain/aggregates/order/order.repository';
import { Order } from 'src/orders/domain/aggregates/order/order.entity';

@CommandHandler(RegisterOrder)
export class RegisterOrderHandler
  implements ICommandHandler<RegisterOrder> {
  constructor(
    private dataSource: DataSource,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterOrder) {
    let order: Order = OrderMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      order = await this.orderRepository.create(order);
       
      if (order == null) throw new Error("");
      order = this.publisher.mergeObjectContext(order);
      order.register();
      order.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      order = null;
    } finally {
      await queryRunner.release();
    }
    

    return order;
  }
}