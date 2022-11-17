import { Traveler } from "./traveler.entity";

export const TRAVELER_REPOSITORY = 'TravelerRepository';

export interface TravelerRepository {
  create(traveler: Traveler): Promise<Traveler>;
  update(traveler: Traveler): Promise<Traveler>;
  delete(travelerId: number): Promise<boolean>;
  getById(id: number): Promise<Traveler>;
  getByDni(dni: string): Promise<Traveler>;
}