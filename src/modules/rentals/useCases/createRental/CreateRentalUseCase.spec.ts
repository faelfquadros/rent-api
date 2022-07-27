import dayjs from "dayjs";

import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalsRepository: InMemoryRentalsRepository;
let dayjsDateProvider: DayjsDateProvider;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      dayjsDateProvider,
      inMemoryCarsRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Test",
      description: "Description test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await inMemoryRentalsRepository.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: "123",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("User already has an open rental", 400));
  });

  it("should not be able to create a new rental if there is another rental open to the same car", async () => {
    await inMemoryRentalsRepository.create({
      car_id: "2222",
      expected_return_date: dayAdd24Hours,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "2222",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car unavailable", 400));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Test 3",
      description: "Description test",
      daily_rate: 100,
      license_plate: "test3",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand3",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("Expected return date must be at least 24 hours", 400)
    );
  });
});
