import { Column, Unique } from 'typeorm';

export class OrderOriginValue {
  @Column('varchar', { name: 'origin', length: 45, nullable: false })
  origin: string;

  private constructor(value: string) {
    this.origin = value;
  }

  public static from(value: string): OrderOriginValue {
    return new OrderOriginValue(value);
  }
}