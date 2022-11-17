import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { BuyerRegistered } from 'src/clients/domain/events/buyer-registered.event';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { BuyerName } from 'src/shared/domain/values/buyer-name.value';
import { ClientId } from './client-id.value';
import { Dni } from '../../../../shared/domain/values/dni.value';
import { Client } from './client.root.entity';
import { PhoneNumber } from 'src/shared/domain/values/phoneNumber.value';

export class Buyer extends Client {
  private name: BuyerName;
  private dni: Dni;
  private phoneNumber: PhoneNumber;

  public constructor(name: BuyerName, dni: Dni, auditTrail: AuditTrail, phoneNumber: PhoneNumber) {
    super(ClientType.BUYER, auditTrail);
    this.name = name;
    this.dni = dni;
    this.phoneNumber = phoneNumber;
  }

  public register() {
    const event = new BuyerRegistered(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue(), this.phoneNumber.getValue());
    this.apply(event);
  }

  public getId(): ClientId {
    return this.id;
  }

  public getName(): BuyerName {
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

  public changeName(name: BuyerName): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}