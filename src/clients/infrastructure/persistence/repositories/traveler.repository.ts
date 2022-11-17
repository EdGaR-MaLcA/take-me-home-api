import { InjectRepository } from "@nestjs/typeorm";
import { TravelerMapper } from "src/clients/application/mappers/traveler.mapper";
import { Traveler } from "src/clients/domain/aggregates/client/traveler.entity";
import { TravelerRepository } from "src/clients/domain/aggregates/client/traveler.repository";
import { Repository } from "typeorm";
import { TravelerEntity } from "../entities/traveler.entity";

export class TravelerEntityRepository implements TravelerRepository  {
  constructor(
    @InjectRepository(TravelerEntity)
    private travelerRepository: Repository<TravelerEntity>,
  ) {}

  async create(traveler: Traveler): Promise<Traveler> {
    let travelerEntity: TravelerEntity = TravelerMapper.domainToEntity(traveler);
    travelerEntity = await this.travelerRepository.save(travelerEntity);
    return TravelerMapper.entityToDomain(travelerEntity);
  }

  async update(traveler: Traveler): Promise<Traveler> {
    let travelerEntity: TravelerEntity = TravelerMapper.domainToEntity(traveler);
    let travelerId: number = traveler.getId().getValue();
    await this.travelerRepository.update({ id: travelerId }, travelerEntity);
    return traveler;
  }

  async delete(travelerId: number): Promise<boolean> {
    await this.travelerRepository.delete({ id: travelerId });
    return true;
  }

  async getById(id: number): Promise<Traveler> {
    let travelerEntity: TravelerEntity = await this.travelerRepository.findOne({ where: { id: id } });
    return TravelerMapper.entityToDomain(travelerEntity);
  }

  async getByDni(dni: string): Promise<Traveler> {
    let travelerEntity: TravelerEntity = await this.travelerRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    return TravelerMapper.entityToDomain(travelerEntity);
  }
}