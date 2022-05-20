import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationsCreateDTO } from "../dtos/ISpecificationsCreateDTO";

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ISpecificationsCreateDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository, ISpecificationsCreateDTO };
