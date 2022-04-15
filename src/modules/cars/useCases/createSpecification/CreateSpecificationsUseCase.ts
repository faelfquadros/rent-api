import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequestBody {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({ name, description }: IRequestBody): Promise<void> {
    const specification = await this.specificationsRepository.findByName(name);

    if (specification) {
      throw new AppError("Specification Already Exists", 409);
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationsUseCase };
