import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let inMemoryCarsRepository: InMemoryCarsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository
    );
  });

  it("Shoud not be able to add a specification to a car that does not exist", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["12345"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Shoud be able to add to a existence car a new specification", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    const car_id = car.id;
    const specifications_id = ["12345"];

    await createCarSpecificationUseCase.execute({ car_id, specifications_id });
  });
});
