import request from "../config/common"
import faker from "faker"
const TOKEN =
  "7a98dd6cb83525936ae67381554df7c7198a19a0a1e81dba9d86749482e40441";
export const createRandomUser = async () => {
  const userData = {
    email: faker.internet.email(),
    name: faker.name.findName(),
    gender: "Male",
    status: "Active"
  };
  const response = await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userData);
  return response.body.data.id;
};
