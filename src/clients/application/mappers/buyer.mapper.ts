import { Buyer } from 'src/clients/domain/aggregates/client/buyer.entity';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { RegisterBuyer } from '../messages/commands/register-buyer.command';
import { BuyerName } from 'src/shared/domain/values/buyer-name.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { BuyerFactory } from 'src/clients/domain/factories/buyer.factory';
import { BuyerClientDto } from '../dtos/response/buyer-client.dto';
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';
import { RegisterBuyerRequest } from '../dtos/request/register-buyer-request.dto';
import { RegisterBuyerResponse } from '../dtos/response/register-buyer-response.dto';
import { BuyerEntity } from 'src/clients/infrastructure/persistence/entities/buyer.entity';
import { BuyerNameValue } from 'src/clients/infrastructure/persistence/values/buyer-name.value';
import { DniValue } from 'src/clients/infrastructure/persistence/values/dni.value';
import { PhoneNumberValue } from 'src/clients/infrastructure/persistence/values/phoneNumber.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { PhoneNumber } from 'src/shared/domain/values/phoneNumber.value';

export class BuyerMapper {
  public static dtoRequestToCommand(registerBuyerRequest: RegisterBuyerRequest) {
    return new RegisterBuyer(
      registerBuyerRequest.firstName,
      registerBuyerRequest.lastName,
      registerBuyerRequest.dni,
      registerBuyerRequest.phoneNumber,
    );
  }

  public static domainToDtoResponse(buyer: Buyer) {
    return new RegisterBuyerResponse(
      buyer.getId().getValue(),
      buyer.getName().getFirstName(),
      buyer.getName().getLastName(),
      buyer.getDni().getValue(),
      buyer.getPhoneNumber().getValue(),
      buyer.getAuditTrail().getCreatedAt().format(),
      buyer.getAuditTrail().getCreatedBy().getValue(),
      
    );
  }
  
  public static commandToDomain(command: RegisterBuyer, userId: number): Buyer {
    const buyerName: BuyerName = BuyerName.create(command.firstName, command.lastName);
    const dni: Dni = Dni.create(command.dni);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );

    const phoneNumber: PhoneNumber = PhoneNumber.create(command.phoneNumber);
    let buyer: Buyer = BuyerFactory.from(buyerName, dni, auditTrail, phoneNumber);
    return buyer;
  }

  public static domainToEntity(buyer: Buyer): BuyerEntity {
    const buyerEntity: BuyerEntity = new BuyerEntity();
    buyerEntity.name = BuyerNameValue.from(buyer.getName().getFirstName(), buyer.getName().getLastName());
    buyerEntity.dni = DniValue.from(buyer.getDni().getValue());
    const createdAt: string = buyer.getAuditTrail() != null && buyer.getAuditTrail().getCreatedAt() != null ? buyer.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = buyer.getAuditTrail() != null && buyer.getAuditTrail().getCreatedBy() != null ? buyer.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = buyer.getAuditTrail() != null && buyer.getAuditTrail().getUpdatedAt() != null ? buyer.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = buyer.getAuditTrail() != null && buyer.getAuditTrail().getUpdatedBy() != null ? buyer.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    buyerEntity.auditTrail = auditTrailValue;
    buyerEntity.phoneNumber = PhoneNumberValue.from(buyer.getPhoneNumber().getValue());
   

    return buyerEntity;
  }

  public static entityToDomain(buyerEntity: BuyerEntity): Buyer {
    if (buyerEntity == null) return null;
    
    const buyerName: BuyerName = BuyerName.create(buyerEntity.name.firstName, buyerEntity.name.lastName);
    const dni: Dni = Dni.create(buyerEntity.dni.value);
    const auditTrail: AuditTrail = AuditTrail.from(
      buyerEntity.auditTrail.createdAt != null ? DateTime.fromString(buyerEntity.auditTrail.createdAt) : null,
      buyerEntity.auditTrail.createdBy != null ? UserId.of(buyerEntity.auditTrail.createdBy) : null,
      buyerEntity.auditTrail.updatedAt != null ? DateTime.fromString(buyerEntity.auditTrail.updatedAt) : null,
      buyerEntity.auditTrail.updatedBy != null ? UserId.of(buyerEntity.auditTrail.updatedBy) : null
    );
    const clientId: ClientId = ClientId.of(buyerEntity.id);
    const phoneNumber: PhoneNumber = PhoneNumber.create(buyerEntity.phoneNumber.value);
    let buyer: Buyer = BuyerFactory.withId(clientId, buyerName, dni, auditTrail, phoneNumber);
    return buyer;
  }

  public static ormToBuyerClientDto(row: any): BuyerClientDto {
    let dto = new BuyerClientDto();
    dto.id = Number(row.id);
    dto.firstName = row.firstName;
    dto.lastName = row.lastName;
    dto.dni = row.dni;
    dto.phoneNumber = row.phoneNumber;
    return dto;
  }
}