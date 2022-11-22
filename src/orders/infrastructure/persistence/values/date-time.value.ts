import { Column, Unique } from 'typeorm';

export class DateTimeValue {
    @Column('datetime', { name: 'max_date', nullable: false })
    public max_date: string;

  private constructor(value: string) {
    this.max_date = value;
  }

  public static from(value: string): DateTimeValue {
    return new DateTimeValue(value);
  }
}