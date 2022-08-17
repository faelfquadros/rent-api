import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

import "@shared/container";

createConnection();
const app = express();

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(router);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error: ${error}`,
  });
});

export { app };
