import { Request, Response, NextFunction } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user;

  const userRepository = new UsersRepository();

  const user = await userRepository.findById(id);

  if (!user.admin) {
    throw new AppError("User is not an admin");
  }

  return next();
}
