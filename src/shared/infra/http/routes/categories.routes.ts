/* eslint-disable prettier/prettier */
import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import uploadConfig from "../../../../config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const uploadCategories = multer(uploadConfig.upload("./tmp"));

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/" ,listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post("/import", ensureAuthenticated, ensureAdmin, uploadCategories.single("file"), importCategoryController.handle);

export { categoriesRoutes };
