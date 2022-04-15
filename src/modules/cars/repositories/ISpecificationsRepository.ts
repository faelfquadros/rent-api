import { ISpecificationsCreateDTO } from "../dtos/ISpecificationsCreateDTO";
import { Specification } from "../entities/Specification";

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsCreateDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository, ISpecificationsCreateDTO };
