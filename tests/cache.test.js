const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index.js");

// Connect to the database before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

// Disconnect from the database after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

//Testing different API endpoints
describe("POST /cache/keys", () => {
  it("should add provided key and value in the cache", async () => {
    const res = await request(app).post("/cache/keys").send({
      key_name: "John Doe",
      value: "johndoe@example.com",
    });
    expect(res.statusCode).toBe(201);
  });
});

describe("GET /cache/keys", () => {
  it("should return all the keys", async () => {
    const res = await request(app).get("/cache/keys");
    expect(res.statusCode).toBe(200);
    expect(res.body.keys.length).toBeGreaterThan(0);
  });
});

describe("GET /cache/keys/{keyName}", () => {
  it("should return value of the key-name provided in url", async () => {
    const keyName = encodeURIComponent("John Doe");
    const res = await request(app).get(`/cache/keys/${keyName}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.value).toBe("johndoe@example.com");
  });
});

describe("GET /cache/keys/{keyName}", () => {
  it("should add new key if key name does not exist", async () => {
    const keyName = encodeURIComponent("BlueBerry");
    const res = await request(app).get(`/cache/keys/${keyName}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.key).toBe("BlueBerry");
  });
});

describe("DELETE /cache/keys", () => {
  it("should delete a key", async () => {
    const keyName = encodeURIComponent("John Doe");
    const res = await request(app).delete(`/cache/keys/${keyName}`);

    expect(res.statusCode).toBe(204);
  });
});

describe("DELETE /cache/clear", () => {
  it("should delete all keys and clear cache", async () => {
    const res = await request(app).delete("/cache/clear");
    expect(res.statusCode).toBe(204);
  });
});
