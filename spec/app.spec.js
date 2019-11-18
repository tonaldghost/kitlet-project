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
    describe("GET REJECTED", () => {
      it("catches any anomalous urls passed --> WILDCARD", () => {
        return request(app)
          .get("/api/banarama")
          .expect(404)
          .then(({ body }) => {
            expect(body.wildcard).to.equal("Page not found!");
          });
      });
    });
  });
  describe("/items/:item_id", () => {
    describe("GET RESOLVED", () => {
      it("Status: 200 and returns single item by its id on the key item (no array)", () => {
        return request(app)
          .get("/api/items/3")
          .expect(200)
          .then(({ body: { item } }) => {
            expect(item).to.be.an("object");
            expect(item).to.contain.keys(
              "owner",
              "category",
              "body",
              "img_url",
              "is_available"
            );
          });
      });
    });
    describe("GET REJECTED", () => {
      it("returns 404 if passed non-existent author", () => {
        return request(app)
          .get("/api/items/99")
          .expect(404)
          .then(({ text }) => {
            expect(text).to.equal("Item not found");
          });
      });
      it("returns 404 if passed invalid item end point (not numeric)", () => {
        return request(app)
          .get("/api/items/apples")
          .expect(404);
      });
    });
  });
  describe("/categories", () => {
    describe("GET RESOLVED", () => {
      it("Status: 200 and returns all items", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .then(({ body: { categories } }) => {
            expect(categories).to.be.an("array");
            expect(categories[0]).to.contain.keys("slug", "description");
          });
      });
    });
  });
  describe("/users", () => {
    describe("GET RESOLVED", () => {
      it("Status: 200 and returns all users", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body: { users } }) => {
            expect(users).to.be.an("array");
            expect(users[0]).to.contain.keys("username", "fullname", "img");
          });
      });
    });
  });
  describe("/users/:username", () => {
    describe("GET RESOLVED", () => {
      it("Status: 200 and returns single user by username (no array)", () => {
        return request(app)
          .get("/api/users/tonyboi")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.be.an("object");
            expect(user).to.contain.keys("username", "fullname", "img");
          });
      });
    });
  });
});
