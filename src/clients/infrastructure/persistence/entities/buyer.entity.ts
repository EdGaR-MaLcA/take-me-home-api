import { ChildEntity, Column } from 'typeorm';
import { ClientType } from '../../../domain/aggregates/client/client-type.enum';
import { DniValue } from '../values/dni.value';
import { BuyerNameValue } from '../values/buyer-name.value';
import { ClientEntity } from './client.entity';
import { PhoneNumberValue } from '../values/phoneNumber.value';

@ChildEntity(ClientType.BUYER)
export class BuyerEntity extends ClientEntity {
  @Column((type) => BuyerNameValue, { prefix: false })
  public name: BuyerNameValue;

  @Column((type) => DniValue, { prefix: false })
  public dni: DniValue;

  @Column((type) => PhoneNumberValue, { prefix: false })
  public phoneNumber: PhoneNumberValue;
}
