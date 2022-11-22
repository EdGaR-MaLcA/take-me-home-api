export class RegisterOrderRequest {
    constructor(
      public readonly client_id: number,
      public readonly origin: string,
      public readonly destination: string,
      public readonly max_date: string,

    ) {}
  }