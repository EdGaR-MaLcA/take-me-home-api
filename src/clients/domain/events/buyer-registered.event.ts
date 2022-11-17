export class BuyerRegistered {
    constructor(
      public readonly id: number,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly dni: string,
      public readonly phoneNumber: string,
    ) {
    }
  }