import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequestBody {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequestBody): Promise<void> {
    const categoryAlreryExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreryExists) {
      throw new AppError("Category Alreary Exists!", 409);
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
