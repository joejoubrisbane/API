
import mocha from "mocha";

import supertest from "supertest";
import qa from "../config/UAT"
const request = supertest(qa.baseUrl);
export default request;