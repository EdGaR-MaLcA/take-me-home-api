import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { BuyerClientDto } from '../../dtos/response/buyer-client.dto';
import { GetBuyerClients } from '../../messages/queries/get-buyer-clients.query';
import { BuyerMapper } from '../../mappers/buyer.mapper';

@QueryHandler(GetBuyerClients)
export class GetBuyerClientsHandler implements IQueryHandler<GetBuyerClients> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetBuyerClients) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni,
      phone_number as phoneNumber
    FROM 
      clients
    WHERE
      type = 'B'
    ORDER BY
      last_name, first_name;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const buyerClients: BuyerClientDto[] = rows.map(function (row: any) {
      return BuyerMapper.ormToBuyerClientDto(row);
    });
    return buyerClients;
  }
}