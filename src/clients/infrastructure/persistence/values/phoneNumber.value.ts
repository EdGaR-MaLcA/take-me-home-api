import { Column, Unique } from 'typeorm';

export class PhoneNumberValue {
  @Column('varchar', { name: 'phone_number', length: 9, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): PhoneNumberValue {
    return new PhoneNumberValue(value);
  }
}