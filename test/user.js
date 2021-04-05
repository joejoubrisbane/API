require('custom-env').env()
import { expect } from "chai/index";
import request from "../config/common"
import faker from "faker"
const TOKEN = process.env.USER_TOKEN;
describe("Users", () => {
  let userId;
  const data = {
    email: faker.internet.email(),
    name: faker.name.findName(),
    gender: "Male",
    status: "Active"
  };
  describe("POST", () => {
    it("POST /users", async function() {
        const res = await request
            .post("users")
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data);
        expect(res.body.data.email).to.be.eq(data.email);
        expect(res.body.data.status).to.be.eq(data.status);
        expect(res.body.data).to.deep.include(data);
        userId = res.body.data.id;
    });
  });
  describe("Get", () => {
    it(`Get /users${userId} is not empty`, async function() {
        const res = await request.get(`users/${userId}?access-token=${TOKEN}`);
        expect(res.body.data).not.to.be.empty;
        expect(res.body.data).to.deep.include(data);
    });
    it("Get /users with params", function() {
      return request
        .get(`users/?page=5&gender=female&access-token=${TOKEN}`)
        .then(res => {
          res.body.data.forEach(user => {
            expect(user.gender).to.be.eq("Female");
          });
          expect(res.body.data).not.to.be.empty;
        });
    });
  });
  describe("PUT", () => {
    it("PUT /user/:id", function() {
      const data = {
        status: "Active",
        name: faker.name.findName()
      };
      return request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then(res => {
          console.log("put", res.body);
        });
    });
  });

  describe("DELETE", () => {
    it("DELETE /user/:id", function() {
      const data = {
        status: "Active",
        name: `Modified +${Math.floor(Math.random() * 999)}`
      };
      return request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then(res => {
          console.log("delete", res.body);
        });
    });
  });
});
