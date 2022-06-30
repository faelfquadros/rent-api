import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post(
  "/:id/devolution",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };
