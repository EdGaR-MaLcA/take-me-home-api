import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterTravelerRequest } from 'src/clients/application/dtos/request/register-traveler-request.dto';
import { TravelerApplicationService } from 'src/clients/application/services/traveler-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterTravelerResponse } from 'src/clients/application/dtos/response/register-traveler-response.dto';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { GetTravelerClients } from 'src/clients/application/messages/queries/get-traveler-clients.query';

@Controller('clients/traveler')
export class TravelerController {
  constructor(
    private readonly travelerApplicationService: TravelerApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  async register(
    @Body() registerTravelerRequest: RegisterTravelerRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterTravelerResponse> = await this.travelerApplicationService.register(registerTravelerRequest);
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
      const customers = await this.queryBus.execute(new GetTravelerClients());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const traveler = await this.travelerApplicationService.getById(id);
      return ApiController.ok(response, traveler);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}