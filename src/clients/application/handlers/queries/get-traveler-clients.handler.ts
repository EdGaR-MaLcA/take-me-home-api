import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { TravelerClientDto } from '../../dtos/response/traveler-client.dto';
import { GetTravelerClients } from '../../messages/queries/get-traveler-clients.query';
import { TravelerMapper } from '../../mappers/traveler.mapper';

@QueryHandler(GetTravelerClients)
export class GetTravelerClientsHandler implements IQueryHandler<GetTravelerClients> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetTravelerClients) {
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
      type = 'T'
    ORDER BY
      last_name, first_name;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const travelerClients: TravelerClientDto[] = rows.map(function (row: any) {
      return TravelerMapper.ormToTravelerClientDto(row);
    });
    return travelerClients;
  }
}