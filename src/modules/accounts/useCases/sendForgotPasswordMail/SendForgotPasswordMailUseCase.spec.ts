import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryUsersTokensRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { InMemoryMailProvider } from "@shared/container/providers/MailProvider/in-memory/InMemoryMailProvider";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let inMemoryUsersRepository: IUsersRepository;
let inMemoryUsersTokensRepository: IUsersTokensRepository;
let dateProvider: IDateProvider;
let inMemoryMailProvider: IMailProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    inMemoryMailProvider = new InMemoryMailProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider,
      inMemoryMailProvider
    );
  });

  it("should be able to send a forgot password email", async () => {
    const sendMail = jest.spyOn(inMemoryMailProvider, "sendMail");

    await inMemoryUsersRepository.create({
      name: "User test",
      email: "userteste@test.com",
      password: "userpass",
      driver_license: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("userteste@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send email if user does not exits", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("userteste@test.com")
    ).rejects.toEqual(new AppError("User does not exists", 404));
  });

  it("should be able to create an users token", async () => {
    const userToken = jest.spyOn(inMemoryUsersTokensRepository, "create");

    await inMemoryUsersRepository.create({
      name: "User test",
      email: "userteste@test.com",
      password: "userpass",
      driver_license: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("userteste@test.com");

    expect(userToken).toHaveBeenCalled();
  });
});
