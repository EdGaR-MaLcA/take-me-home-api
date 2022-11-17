import { Buyer } from "./buyer.entity";

export const BUYER_REPOSITORY = 'BuyerRepository';

export interface BuyerRepository {
  create(buyer: Buyer): Promise<Buyer>;
  update(buyer: Buyer): Promise<Buyer>;
  delete(buyerId: number): Promise<boolean>;
  getById(id: number): Promise<Buyer>;
  getByDni(dni: string): Promise<Buyer>;
}