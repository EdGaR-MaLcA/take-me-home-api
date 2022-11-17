import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterBuyer } from '../messages/commands/register-buyer.command';
import { BuyerRepository, BUYER_REPOSITORY } from 'src/clients/domain/aggregates/client/buyer.repository';
import { Buyer } from 'src/clients/domain/aggregates/client/buyer.entity';

@Injectable()
export class RegisterBuyerValidator {
  constructor(
    @Inject(BUYER_REPOSITORY)
    private buyerRepository: BuyerRepository,
  ) {
  }

  public async validate(registerBuyer: RegisterBuyer,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerBuyer.firstName ? registerBuyer.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerBuyer.lastName ? registerBuyer.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerBuyer.dni ? registerBuyer.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    const phoneNumber: string = registerBuyer.phoneNumber ? registerBuyer.phoneNumber.trim() : '';
    if (phoneNumber.length <= 0) {
      notification.addError('phoneNumber is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const buyer: Buyer = await this.buyerRepository.getByDni(dni);
    if (buyer != null) notification.addError('dni is taken', null);
    
    return notification;
  }
}