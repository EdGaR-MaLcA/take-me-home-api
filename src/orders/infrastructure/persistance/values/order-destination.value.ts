import { Column, Unique } from 'typeorm';

export class OrderDestinationValue {
  @Column('varchar', { name: 'destination', length: 45, nullable: false })
  destination: string;

  private constructor(value: string) {
    this.destination = value;
  }

  public static from(value: string): OrderDestinationValue {
    return new OrderDestinationValue(value);
  }
}