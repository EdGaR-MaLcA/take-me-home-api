export class RegisterBuyerResponse {
    constructor(
      public id: number,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly dni: string,
      public readonly phoneNumber: string,
      public readonly createdAt: string,
      public readonly createdBy: number
    ) {}
  }