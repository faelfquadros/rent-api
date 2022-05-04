import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { AppError } from "@shared/errors/AppError";

import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("Create car", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
  });

  it("shoud be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    expect(car).toBeInstanceOf(Car);
    expect(car).toHaveProperty("id");
  });

  it("shoud not be able to create a car with the same license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Fusca",
        description: "Carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
      });

      await createCarUseCase.execute({
        name: "Fusca 2",
        description: "Carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shoud create a car with availability", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    expect(car.available).toBe(true);
  });
});
