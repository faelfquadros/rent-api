import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(`
       insert into users (id, name, email, password, admin, created_at, driver_license)
       values('${id}', 'admin', 'admin@rentapi.com', '${password}', true, 'now()', 'XXXXXX')`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("shoud be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentapi.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category super test name",
        description: "Category super test description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("shoud not be able to create a new category if name already exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentapi.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category super test name",
        description: "Category super test description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(409);
  });
});
