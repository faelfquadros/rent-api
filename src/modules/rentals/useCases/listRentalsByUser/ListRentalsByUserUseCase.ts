import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ user_id }: IRequest) {
    const rentals = await this.rentalsRepository.findByUserId(user_id);

    return rentals;
  }
}

export { ListRentalsByUserUseCase };
