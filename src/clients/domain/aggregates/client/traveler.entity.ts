import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { TravelerRegistered } from 'src/clients/domain/events/traveler-registered.event';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { TravelerName } from 'src/shared/domain/values/traveler-name.value';
import { ClientId } from './client-id.value';
import { Dni } from '../../../../shared/domain/values/dni.value';
import { Client } from './client.root.entity';
import { PhoneNumber } from 'src/shared/domain/values/phoneNumber.value';

export class Traveler extends Client {
  private name: TravelerName;
  private dni: Dni;
  private phoneNumber: PhoneNumber;

  public constructor(name: TravelerName, dni: Dni, auditTrail: AuditTrail, phoneNumber: PhoneNumber) {
    super(ClientType.TRAVELER, auditTrail);
    this.name = name;
    this.dni = dni;
    this.phoneNumber = phoneNumber;
  }

  public register() {
    const event = new TravelerRegistered(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue(), this.phoneNumber.getValue());
    this.apply(event);
  }

  public getId(): ClientId {
    return this.id;
  }

  public getName(): TravelerName {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public getPhoneNumber(): PhoneNumber {
    return this.phoneNumber;
  }

  public changeName(name: TravelerName): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}