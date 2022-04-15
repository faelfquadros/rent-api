/* eslint-disable no-use-before-define */
import { Repository, getRepository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { Specification } from "../../entities/Specification";
import {
  ISpecificationsCreateDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  constructor() {
    this.repository = getRepository(Specification);
  }

  private repository: Repository<Specification>;

  async create({ name, description }: ISpecificationsCreateDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }

  async list(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
}

export { SpecificationsRepository };
