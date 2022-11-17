import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterTravelerRequest } from '../dtos/request/register-traveler-request.dto';
import { RegisterTravelerResponse } from '../dtos/response/register-traveler-response.dto';
import { RegisterTravelerValidator } from '../validators/register-traveler.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterTraveler } from '../messages/commands/register-traveler.command';
import { TravelerRepository, TRAVELER_REPOSITORY } from 'src/clients/domain/aggregates/client/traveler.repository';
import { Traveler } from 'src/clients/domain/aggregates/client/traveler.entity';
import { TravelerMapper } from '../mappers/traveler.mapper';

@Injectable()
export class TravelerApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerTravelerValidator: RegisterTravelerValidator,
    @Inject(TRAVELER_REPOSITORY)
    private readonly travelerRepository: TravelerRepository,
  ) {}

  async register(
    registerTravelerRequest: RegisterTravelerRequest,
  ): Promise<Result<AppNotification, RegisterTravelerResponse>> {
    const registerTraveler: RegisterTraveler = TravelerMapper.dtoRequestToCommand(registerTravelerRequest);
    const notification: AppNotification = await this.registerTravelerValidator.validate(registerTraveler);
    if (notification.hasErrors()) return Result.error(notification);
    const traveler: Traveler = await this.commandBus.execute(registerTraveler);
    const response: RegisterTravelerResponse = TravelerMapper.domainToDtoResponse(traveler);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.travelerRepository.getById(id);
  }
}