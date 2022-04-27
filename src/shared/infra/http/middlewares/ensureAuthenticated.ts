import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "ceea561cd5ef46fb0a61054e537ceccd"
    ) as IPayload;

    const usersRespository = new UsersRepository();

    const user = await usersRespository.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid JWT token", 401);
  }
}
