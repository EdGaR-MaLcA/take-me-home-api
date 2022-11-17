import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterBuyerRequest } from 'src/clients/application/dtos/request/register-buyer-request.dto';
import { BuyerApplicationService } from 'src/clients/application/services/buyer-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterBuyerResponse } from 'src/clients/application/dtos/response/register-buyer-response.dto';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { GetBuyerClients } from 'src/clients/application/messages/queries/get-buyer-clients.query';

@Controller('clients/buyer')
export class BuyerController {
  constructor(
    private readonly buyerApplicationService: BuyerApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  async register(
    @Body() registerBuyerRequest: RegisterBuyerRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterBuyerResponse> = await this.buyerApplicationService.register(registerBuyerRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetBuyerClients());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const buyer = await this.buyerApplicationService.getById(id);
      return ApiController.ok(response, buyer);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}