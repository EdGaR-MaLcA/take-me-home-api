import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/shared/application/app.notification';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { RegisterOrderRequest } from 'src/orders/application/dtos/request/register-order-request.dto';
import { RegisterOrderResponse } from 'src/orders/application/dtos/response/register-order-response.dto';
import { OrderApplicationService } from 'src/orders/application/services/order-application.service';
import { GetOrders } from 'src/orders/application/messages/queries/get-order.query';
 

@Controller('orders')
export class OrderController {
  constructor(
    private readonly OrderApplicationService: OrderApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  async register(
    @Body() registerOrderRequest: RegisterOrderRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterOrderResponse> = await this.OrderApplicationService.register(registerOrderRequest);
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
      const orders = await this.queryBus.execute(new GetOrders());
      return ApiController.ok(response, orders);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const order = await this.OrderApplicationService.getById(id);
      return ApiController.ok(response, order);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}