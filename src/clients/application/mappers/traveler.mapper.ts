import { Traveler } from 'src/clients/domain/aggregates/client/traveler.entity';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { RegisterTraveler } from '../messages/commands/register-traveler.command';
import { TravelerName } from 'src/shared/domain/values/traveler-name.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { TravelerFactory } from 'src/clients/domain/factories/traveler.factory';
import { TravelerClientDto } from '../dtos/response/traveler-client.dto';
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';
import { RegisterTravelerRequest } from '../dtos/request/register-traveler-request.dto';
import { RegisterTravelerResponse } from '../dtos/response/register-traveler-response.dto';
import { TravelerEntity } from 'src/clients/infrastructure/persistence/entities/traveler.entity';
import { TravelerNameValue } from 'src/clients/infrastructure/persistence/values/traveler-name.value';
import { DniValue } from 'src/clients/infrastructure/persistence/values/dni.value';
import { PhoneNumberValue } from 'src/clients/infrastructure/persistence/values/phoneNumber.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { PhoneNumber } from 'src/shared/domain/values/phoneNumber.value';

export class TravelerMapper {
  public static dtoRequestToCommand(registerTravelerRequest: RegisterTravelerRequest) {
    return new RegisterTraveler(
      registerTravelerRequest.firstName,
      registerTravelerRequest.lastName,
      registerTravelerRequest.dni,
      registerTravelerRequest.phoneNumber,
    );
  }

  public static domainToDtoResponse(traveler: Traveler) {
    return new RegisterTravelerResponse(
      traveler.getId().getValue(),
      traveler.getName().getFirstName(),
      traveler.getName().getLastName(),
      traveler.getDni().getValue(),
      traveler.getPhoneNumber().getValue(),
      traveler.getAuditTrail().getCreatedAt().format(),
      traveler.getAuditTrail().getCreatedBy().getValue()
    );
  }
  
  public static commandToDomain(command: RegisterTraveler, userId: number): Traveler {
    const travelerName: TravelerName = TravelerName.create(command.firstName, command.lastName);
    const dni: Dni = Dni.create(command.dni);
    const phoneNumber: PhoneNumber = PhoneNumber.create(command.phoneNumber);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );
    let traveler: Traveler = TravelerFactory.from(travelerName, dni, auditTrail, phoneNumber);
    return traveler;
  }

  public static domainToEntity(traveler: Traveler): TravelerEntity {
    const travelerEntity: TravelerEntity = new TravelerEntity();
    travelerEntity.name = TravelerNameValue.from(traveler.getName().getFirstName(), traveler.getName().getLastName());
    travelerEntity.dni = DniValue.from(traveler.getDni().getValue());
    travelerEntity.phoneNumber = PhoneNumberValue.from(traveler.getPhoneNumber().getValue());
    const createdAt: string = traveler.getAuditTrail() != null && traveler.getAuditTrail().getCreatedAt() != null ? traveler.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = traveler.getAuditTrail() != null && traveler.getAuditTrail().getCreatedBy() != null ? traveler.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = traveler.getAuditTrail() != null && traveler.getAuditTrail().getUpdatedAt() != null ? traveler.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = traveler.getAuditTrail() != null && traveler.getAuditTrail().getUpdatedBy() != null ? traveler.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    travelerEntity.auditTrail = auditTrailValue;
    return travelerEntity;
  }

  public static entityToDomain(travelerEntity: TravelerEntity): Traveler {
    if (travelerEntity == null) return null;
    const travelerName: TravelerName = TravelerName.create(travelerEntity.name.firstName, travelerEntity.name.lastName);
    const dni: Dni = Dni.create(travelerEntity.dni.value);
    const phoneNumber: PhoneNumber = PhoneNumber.create(travelerEntity.phoneNumber.value);
    const auditTrail: AuditTrail = AuditTrail.from(
      travelerEntity.auditTrail.createdAt != null ? DateTime.fromString(travelerEntity.auditTrail.createdAt) : null,
      travelerEntity.auditTrail.createdBy != null ? UserId.of(travelerEntity.auditTrail.createdBy) : null,
      travelerEntity.auditTrail.updatedAt != null ? DateTime.fromString(travelerEntity.auditTrail.updatedAt) : null,
      travelerEntity.auditTrail.updatedBy != null ? UserId.of(travelerEntity.auditTrail.updatedBy) : null
    );
    const clientId: ClientId = ClientId.of(travelerEntity.id);
    let traveler: Traveler = TravelerFactory.withId(clientId, travelerName, dni, auditTrail, phoneNumber);
    return traveler;
  }

  public static ormToTravelerClientDto(row: any): TravelerClientDto {
    let dto = new TravelerClientDto();
    dto.id = Number(row.id);
    dto.firstName = row.firstName;
    dto.lastName = row.lastName;
    dto.dni = row.dni;
    dto.phoneNumber = row.phoneNumber;
    return dto;
  }
}