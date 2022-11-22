import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { OrderDto } from '../../dtos/response/order.dto';
import { OrderMapper } from '../../mappers/order.mapper';
import { GetOrders } from '../../messages/queries/get-order.query';
 

@QueryHandler(GetOrders)
export class GetOrdersHandler implements IQueryHandler<GetOrders> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetOrders) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT
      a.id,
      a.client_id,
      a.origin,
      a.destination,
      a.max_date,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      orders a;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];

    const orders: OrderDto[] = rows.map(function (row: any) {
      return OrderMapper.ormToOrderDto(row);
    });

    return orders;
  }
}