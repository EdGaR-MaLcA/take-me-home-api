import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterBuyer } from '../../messages/commands/register-buyer.command';
import { BuyerMapper } from '../../mappers/buyer.mapper';
import { Buyer } from 'src/clients/domain/aggregates/client/buyer.entity';
import { Inject } from '@nestjs/common';
import { BuyerRepository, BUYER_REPOSITORY } from 'src/clients/domain/aggregates/client/buyer.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterBuyer)
export class RegisterBuyerHandler
  implements ICommandHandler<RegisterBuyer> {
  constructor(
    private dataSource: DataSource,
    @Inject(BUYER_REPOSITORY)
    private readonly buyerRepository: BuyerRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterBuyer) {
    let buyer: Buyer = BuyerMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
        
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      buyer = await this.buyerRepository.create(buyer);
 
      if (buyer == null) throw new Error("");
      buyer = this.publisher.mergeObjectContext(buyer);
      buyer.register();
      buyer.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      buyer = null;
    } finally {
      await queryRunner.release();
    }
    return buyer;
  }
}