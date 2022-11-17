import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterBuyerRequest } from '../dtos/request/register-buyer-request.dto';
import { RegisterBuyerResponse } from '../dtos/response/register-buyer-response.dto';
import { RegisterBuyerValidator } from '../validators/register-buyer.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterBuyer } from '../messages/commands/register-buyer.command';
import { BuyerRepository, BUYER_REPOSITORY } from 'src/clients/domain/aggregates/client/buyer.repository';
import { Buyer } from 'src/clients/domain/aggregates/client/buyer.entity';
import { BuyerMapper } from '../mappers/buyer.mapper';

@Injectable()
export class BuyerApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerBuyerValidator: RegisterBuyerValidator,
    @Inject(BUYER_REPOSITORY)
    private readonly buyerRepository: BuyerRepository,
  ) {}

  async register(
    registerBuyerRequest: RegisterBuyerRequest,
  ): Promise<Result<AppNotification, RegisterBuyerResponse>> {
    const registerBuyer: RegisterBuyer = BuyerMapper.dtoRequestToCommand(registerBuyerRequest);
    const notification: AppNotification = await this.registerBuyerValidator.validate(registerBuyer);
    if (notification.hasErrors()) return Result.error(notification);
    const buyer: Buyer = await this.commandBus.execute(registerBuyer);
    const response: RegisterBuyerResponse = BuyerMapper.domainToDtoResponse(buyer);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.buyerRepository.getById(id);
  }
}