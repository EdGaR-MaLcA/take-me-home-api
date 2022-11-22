import { InjectRepository } from "@nestjs/typeorm";
import { OrderMapper } from "src/orders/application/mappers/order.mapper";
import { Order } from "src/orders/domain/aggregates/order/order.entity";
import { OrderRepository } from "src/orders/domain/aggregates/order/order.repository";
import { Repository } from "typeorm";
import { OrderEntity } from "../entities/order.entity";
 

export class OrderEntityRepository implements OrderRepository  {
  constructor(
    @InjectRepository(OrderEntity)
    private OrderRepository: Repository<OrderEntity>,
  ) {}

  async create(order: Order): Promise<Order> {
    let orderEntity: OrderEntity = OrderMapper.domainToEntity(order);

    console.log("Order Entity Before Call Save Mathod", orderEntity);

    //When the save repository method is called, it return null value

    orderEntity = await this.OrderRepository.save(orderEntity);

    console.log("Order Entity After Calling Save Method", orderEntity);

    return OrderMapper.entityToDomain(orderEntity);
  }

  async update(order: Order): Promise<Order> {
    let orderEntity: OrderEntity = OrderMapper.domainToEntity(order);
    let orderId: number = order.getId().getValue();
    await this.OrderRepository.update({ id: orderId }, orderEntity);
    return order;
  }

  async delete(orderId: number): Promise<boolean> {
    await this.OrderRepository.delete({ id: orderId });
    return true;
  }

  async getById(id: number): Promise<Order> {
    let orderEntity: OrderEntity = await this.OrderRepository.findOne({ where: { id: id } });
    return OrderMapper.entityToDomain(orderEntity);
  }

 
}