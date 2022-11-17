import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { BuyerName } from '../../../shared/domain/values/buyer-name.value';
import { Buyer } from '../aggregates/client/buyer.entity';
import { ClientId } from '../aggregates/client/client-id.value';
import { Dni } from '../../../shared/domain/values/dni.value';
import { PhoneNumber } from 'src/shared/domain/values/phoneNumber.value';

export class BuyerFactory {
  public static withId(id: ClientId, name: BuyerName, dni: Dni, auditTrail: AuditTrail, phoneNumber: PhoneNumber): Buyer {
    let person: Buyer = new Buyer(name, dni, auditTrail, phoneNumber);
    person.changeId(id);
    return person;
  }

  public static from(name: BuyerName, dni: Dni, auditTrail: AuditTrail, phoneNumber: PhoneNumber): Buyer {
    return new Buyer(name, dni, auditTrail, phoneNumber);
  }
}