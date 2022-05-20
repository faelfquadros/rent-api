import { ISpecificationsCreateDTO } from "@modules/cars/dtos/ISpecificationsCreateDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationsRepository } from "../ISpecificationsRepository";

class InMemorySpecificationsRepository implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ISpecificationsCreateDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return allSpecifications;
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }
}

export { InMemorySpecificationsRepository };
