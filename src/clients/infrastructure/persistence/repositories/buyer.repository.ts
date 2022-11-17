import { InjectRepository } from "@nestjs/typeorm";
import { BuyerMapper } from "src/clients/application/mappers/buyer.mapper";
import { Buyer } from "src/clients/domain/aggregates/client/buyer.entity";
import { BuyerRepository } from "src/clients/domain/aggregates/client/buyer.repository";
import { Repository } from "typeorm";
import { BuyerEntity } from "../entities/buyer.entity";

export class BuyerEntityRepository implements BuyerRepository  {
  constructor(
    @InjectRepository(BuyerEntity)
    private buyerRepository: Repository<BuyerEntity>,
  ) {}

  async create(buyer: Buyer): Promise<Buyer> {
    let buyerEntity: BuyerEntity = BuyerMapper.domainToEntity(buyer);
    buyerEntity = await this.buyerRepository.save(buyerEntity);
    return BuyerMapper.entityToDomain(buyerEntity);
  }

  async update(buyer: Buyer): Promise<Buyer> {
    let buyerEntity: BuyerEntity = BuyerMapper.domainToEntity(buyer);
    let buyerId: number = buyer.getId().getValue();
    await this.buyerRepository.update({ id: buyerId }, buyerEntity);
    return buyer;
  }

  async delete(buyerId: number): Promise<boolean> {
    await this.buyerRepository.delete({ id: buyerId });
    return true;
  }

  async getById(id: number): Promise<Buyer> {
    let buyerEntity: BuyerEntity = await this.buyerRepository.findOne({ where: { id: id } });
    return BuyerMapper.entityToDomain(buyerEntity);
  }

  async getByDni(dni: string): Promise<Buyer> {
    let buyerEntity: BuyerEntity = await this.buyerRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    return BuyerMapper.entityToDomain(buyerEntity);
  }
}