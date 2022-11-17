import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { TravelerName } from '../../../shared/domain/values/traveler-name.value';
import { Traveler } from '../aggregates/client/traveler.entity';
import { ClientId } from '../aggregates/client/client-id.value';
import { Dni } from '../../../shared/domain/values/dni.value';
import { PhoneNumber } from 'src/shared/domain/values/phoneNumber.value';

export class TravelerFactory {
  public static withId(id: ClientId, name: TravelerName, dni: Dni, auditTrail: AuditTrail, phoneNumber: PhoneNumber): Traveler {
    let person: Traveler = new Traveler(name, dni, auditTrail, phoneNumber);
    person.changeId(id);
    return person;
  }

  public static from(name: TravelerName, dni: Dni, auditTrail: AuditTrail, phoneNumber: PhoneNumber): Traveler {
    return new Traveler(name, dni, auditTrail, phoneNumber);
  }
}