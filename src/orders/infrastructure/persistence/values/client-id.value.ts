import { Column } from 'typeorm';

export class ClientIdValue {
  @Column('bigint', { name: 'client_id', unsigned: true })
  public client_id: number;

  private constructor(value: number) {
    this.client_id = Number(value);
  }

  public static from(value: number): ClientIdValue  {
    return new ClientIdValue(value);
  }
}