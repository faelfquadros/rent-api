import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { InMemoryCategoriesRepository } from "@modules/cars/repositories/in-memory/InMemoryCategoriesRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe("Create New Category", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoriesRepository
    );
  });

  it("should be able to create a new categoty", async () => {
    const category: ICreateCategoryDTO = {
      name: "Test Category",
      description: "Test Description",
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await inMemoryCategoriesRepository.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create the same category", async () => {
    const category: ICreateCategoryDTO = {
      name: "Test Category",
      description: "Test Description",
    };

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError("Category Alreary Exists!", 409)
    );
  });
});
