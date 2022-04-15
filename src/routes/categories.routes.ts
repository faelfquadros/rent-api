/* eslint-disable prettier/prettier */
import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const uploadCategories = multer(uploadConfig.upload("./tmp"));

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/" ,listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post("/import", uploadCategories.single("file"), importCategoryController.handle);

export { categoriesRoutes };
