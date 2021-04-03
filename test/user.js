import { expect } from "chai/index";
import mocha from "mocha";
const _ = require("lodash");
import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
const TOKEN =
  "7a98dd6cb83525936ae67381554df7c7198a19a0a1e81dba9d86749482e40441";
describe("Users", () => {
  // it("Get /users", function(done) {
  //   request.get(`users?access-token=${TOKEN}`).end((err, res) => {
  //       console.log(res.body)
  //     expect(res.body.data).not.to.be.empty;
  //       done()
  //   });
  // });
  it("Get /users is not empty", function() {
    return request.get(`users/?access-token=${TOKEN}`).then(res => {
      expect(res.body.data).not.to.be.empty;
    });
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
  it.only("POST /users", function() {
    const data = {
      email: `14${Math.floor(Math.random()*999)}@gmail.com`,
      name: "asdasd",
      gender: "Male",
      status: "Active"
    };
    return request
      .post("users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then(res => {
        expect(res.body.data.email).to.be.eq(data.email);
        expect(res.body.data.status).to.be.eq(data.status);
        expect(res.body.data).to.deep.include(data)
        console.log(res.body);
      });
  });
});
