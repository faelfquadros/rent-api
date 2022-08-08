import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", sendForgotPasswordController.handle);

const resetPasswordUserController = new ResetPasswordUserController();
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
