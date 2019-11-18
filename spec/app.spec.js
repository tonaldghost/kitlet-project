const app = require("../app");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-sorted"));
const request = require("supertest");
const connection = require("../db/connection");

after(() => {
  connection.destroy();
});
beforeEach(() => {
  return connection.seed.run();
});

describe("/api", () => {
  describe("/items", () => {
    describe("GET RESOLVED", () => {
      it("Status: 200 and returns all items", () => {
        return request(app)
          .get("/api/items")
          .expect(200)
          .then(({ body: { items } }) => {
            expect(items).to.be.an("array");
          });
      });
    });
  });
});
