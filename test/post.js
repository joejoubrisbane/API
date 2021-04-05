require('custom-env').env()
import request from "../config/common";
import { createRandomUser } from "../helper/user_helper";
import { expect } from "chai/index";
import faker from "faker";

const TOKEN = process.env.USER_TOKEN;
describe("POST", () => {
  let postId, userId, postData;

  describe("POST", () => {
    before(async () => {
      userId = await createRandomUser();
      postData = {
        user_id: userId,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs()
      };
    });
    it("can POST a new post", async function() {
      const res = await request
        .post("posts")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(postData);
      postId = res.body.data.id;
      expect(res.body.data).to.be.deep.include(postData);
      console.log(res.body.data);
    });
    it("should get the post by id", async function() {
      const res = await request
        .get(`posts/${postId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(postData);
      expect(res.body.data).to.be.deep.include(postData);
    });
    it("401 unauthorized", async function() {
      const res = await request.post("posts").send(postData);
      expect(res.body.code).to.be.eq(401);
      expect(res.body.data.message).to.be.eq("Authentication failed");
    });
    it("422 Validation Failed", async function() {
      postData.body = "";
      const res = await request
        .post("posts")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(postData);
      expect(res.body.code).to.be.eq(422);
      expect(res.body.data[0]).to.be.deep.include({
        field: "body",
        message: "can't be blank"
      });
    });
  });
});
