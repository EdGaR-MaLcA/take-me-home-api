import { Module } from '@nestjs/common';
import { TravelerApplicationService } from './application/services/traveler-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterBuyerValidator } from './application/validators/register-buyer.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterTravelerHandler } from './application/handlers/commands/register-traveler.handler';
import { BuyerRegisteredHandler } from '../notifications/application/handlers/events/buyer-registered.handler';
import { GetBuyerClientsHandler } from './application/handlers/queries/get-buyer-clients.handler';
import { BuyerApplicationService } from './application/services/buyer-application.service';
import { RegisterTravelerValidator } from './application/validators/register-traveler.validator';
import { RegisterBuyerHandler } from './application/handlers/commands/register-buyer.handler';
import { TravelerRegisteredHandler } from '../notifications/application/handlers/events/traveler-registered.handler';
import { ClientEntity } from './infrastructure/persistence/entities/client.entity';
import { BuyerEntity } from './infrastructure/persistence/entities/buyer.entity';
import { TravelerEntity } from './infrastructure/persistence/entities/traveler.entity';
import { BuyerController } from './interface/rest/buyer.controller';
import { TravelerController } from './interface/rest/traveler.controller';
import { BuyerEntityRepository } from './infrastructure/persistence/repositories/buyer.repository';
import { TravelerEntityRepository } from './infrastructure/persistence/repositories/traveler.repository';
import { GetTravelerClientsHandler } from './application/handlers/queries/get-traveler-clients.handler';
import { BUYER_REPOSITORY } from './domain/aggregates/client/buyer.repository';
import { TRAVELER_REPOSITORY } from './domain/aggregates/client/traveler.repository';

export const CommandHandlers = [RegisterBuyerHandler, RegisterTravelerHandler];
export const EventHandlers = [BuyerRegisteredHandler, TravelerRegisteredHandler];
export const QueryHandlers = [GetBuyerClientsHandler, GetTravelerClientsHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([ClientEntity, BuyerEntity, TravelerEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [BuyerController, TravelerController],
  providers: [
    { useClass: BuyerEntityRepository, provide: BUYER_REPOSITORY },
    { useClass: TravelerEntityRepository, provide: TRAVELER_REPOSITORY },
    BuyerApplicationService,
    TravelerApplicationService,
    RegisterBuyerValidator,
    RegisterTravelerValidator,
    BuyerEntityRepository,
    TravelerEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ClientsModule {}
