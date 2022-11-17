import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterTraveler } from '../messages/commands/register-traveler.command';
import { TravelerRepository, TRAVELER_REPOSITORY } from 'src/clients/domain/aggregates/client/traveler.repository';
import { Traveler } from 'src/clients/domain/aggregates/client/traveler.entity';

@Injectable()
export class RegisterTravelerValidator {
  constructor(
    @Inject(TRAVELER_REPOSITORY)
    private travelerRepository: TravelerRepository,
  ) {
  }

  public async validate(registerTraveler: RegisterTraveler,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerTraveler.firstName ? registerTraveler.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerTraveler.lastName ? registerTraveler.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerTraveler.dni ? registerTraveler.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    const phoneNumber: string = registerTraveler.phoneNumber ? registerTraveler.phoneNumber.trim() : '';
    if (phoneNumber.length <= 0) {
      notification.addError('phoneNumber is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const traveler: Traveler = await this.travelerRepository.getByDni(dni);
    if (traveler != null) notification.addError('dni is taken', null);
    
    return notification;
  }
}