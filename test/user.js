import {expect} from "chai/index";

const mocha = require("mocha")
const supertest = require("supertest")
const request = supertest("https://gorest.co.in/public-api/");
const TOKEN = "7a98dd6cb83525936ae67381554df7c7198a19a0a1e81dba9d86749482e40441"
describe("Users",()=>{
    it('Get /users', function () {
        request.get(`users?access-token=${TOKEN}`).end((err,res)=>{
            expect(res.body.data).to.not.be.empty;
        })
    });
})