import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.query(`
     insert into users (id, name, email, password, admin, created_at, driver_license)
     values('${id}', 'admin', 'admin@rentapi.com', '${password}', true, 'now()', 'XXXXXX')`);
}

create().then(() => console.log("User admin created"));
