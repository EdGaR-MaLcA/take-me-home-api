export class RegisterOrderResponse {
  constructor(
    public readonly id: number,
    public readonly client_id: number,
    public readonly origin: string,
    public readonly destination: string,
    public readonly max_date: string,
    public readonly created_at: string,
    public readonly created_by: number,
  ) {}
}