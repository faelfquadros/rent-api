import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate a User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("shoud be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123456789",
      email: "teste@teste.coom",
      name: "Teste",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authentication).toHaveProperty("token");
  });

  it("shoud not be able to authenticate a nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "teste@t.com",
        password: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able to authenticate a user with wrong password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "123456789",
        email: "teste@teste.coom",
        name: "Teste",
        password: "123456",
      };

      await createUserUseCase.execute(user);

      const authentication = await authenticateUserUseCase.execute({
        email: user.email,
        password: "123",
      });

      expect(authentication).toHaveProperty("token");
    }).rejects.toBeInstanceOf(AppError);
  });
});
