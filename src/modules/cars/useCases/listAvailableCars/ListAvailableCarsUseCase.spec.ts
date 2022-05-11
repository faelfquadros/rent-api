import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("List cars", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      inMemoryCarsRepository
    );
  });

  it("shoud be able to list all available cars", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1231",
      fine_amount: 10,
      brand: "VW",
      category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    const carsList = await listAvailableCarsUseCase.execute({});

    expect(carsList).toEqual([car]);
  });

  it("shoud be able to list all available cars by brand", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Fusca 1",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1232",
      fine_amount: 10,
      brand: "VW1",
      category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784421",
    });

    const carsList = await listAvailableCarsUseCase.execute({ brand: "VW1" });

    expect(carsList).toEqual([car]);
  });

  it("shoud be able to list all available cars by category_id", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Fusca 2",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1233",
      fine_amount: 10,
      brand: "VW2",
      category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784422",
    });

    const carsList = await listAvailableCarsUseCase.execute({
      category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784422",
    });

    expect(carsList).toEqual([car]);
  });

  it("shoud be able to list all available cars by name", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Fusca 3",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW3",
      category_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784423",
    });

    const carsList = await listAvailableCarsUseCase.execute({
      name: "Fusca 3",
    });

    expect(carsList).toEqual([car]);
  });
});
