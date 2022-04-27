import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const usersRoutes = Router();

const createUserController = new CreateUserController();
usersRoutes.post("/", createUserController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();
usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
