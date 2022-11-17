import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterTraveler } from '../../messages/commands/register-traveler.command';
import { TravelerMapper } from '../../mappers/traveler.mapper';
import { Traveler } from 'src/clients/domain/aggregates/client/traveler.entity';
import { Inject } from '@nestjs/common';
import { TravelerRepository, TRAVELER_REPOSITORY } from 'src/clients/domain/aggregates/client/traveler.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterTraveler)
export class RegisterTravelerHandler
  implements ICommandHandler<RegisterTraveler> {
  constructor(
    private dataSource: DataSource,
    @Inject(TRAVELER_REPOSITORY)
    private readonly travelerRepository: TravelerRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterTraveler) {
    let traveler: Traveler = TravelerMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      traveler = await this.travelerRepository.create(traveler);
      if (traveler == null) throw new Error("");
      traveler = this.publisher.mergeObjectContext(traveler);
      traveler.register();
      traveler.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      traveler = null;
    } finally {
      await queryRunner.release();
    }
    return traveler;
  }
}