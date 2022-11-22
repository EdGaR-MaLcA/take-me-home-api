import { Order } from "./order.entity";
 
export const ORDER_REPOSITORY = 'OrderRepository';

export interface OrderRepository {
  create(Order: Order): Promise<Order>;
  update(Order: Order): Promise<Order>;
  delete(OrderId: number): Promise<boolean>;
  getById(id: number): Promise<Order>;
}