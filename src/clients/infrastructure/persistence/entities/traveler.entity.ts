import { ChildEntity, Column } from 'typeorm';
import { ClientType } from '../../../domain/aggregates/client/client-type.enum';
import { DniValue } from '../values/dni.value';
import { TravelerNameValue } from '../values/traveler-name.value';
import { ClientEntity } from './client.entity';
import { PhoneNumberValue } from '../values/phoneNumber.value';

@ChildEntity(ClientType.TRAVELER)
export class TravelerEntity extends ClientEntity {
  @Column((type) => TravelerNameValue, { prefix: false })
  public name: TravelerNameValue;

  @Column((type) => DniValue, { prefix: false })
  public dni: DniValue;

  @Column((type) => PhoneNumberValue, { prefix: false })
  public phoneNumber: PhoneNumberValue;
}
