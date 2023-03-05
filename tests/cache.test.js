const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../index");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

//Testing different API endpoints

describe("POST /cache/upsert-key", () => {
  it("should add provided key and value in the cache", async () => {
    const res = await request(app).post("/cache/upsert-key").send({
      "key_name": "John Doe",
      "value": "johndoe@example.com"
    });
    expect(res.statusCode).toBe(201);
  });
});

describe("GET /cache/fetch-all-keys", () => {
  it("should return all the keys", async () => {
    const res = await request(app).get("/cache/fetch-all-keys");
    expect(res.statusCode).toBe(200);
    expect(res.body.keys.length).toBeGreaterThan(0);
  });
});


describe("GET /cache/fetch-key", () => {
  it("should return value of the key provided in header", async () => {
    const res = await request(app).get("/cache/fetch-key").set({
      'key-name': "John Doe"
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.value).toBe("johndoe@example.com")
    expect(res.body.output).toBe("Cache Hit")
  });
});

describe("GET /cache/fetch-key", () => {
  it("should add new key if key name does not exist", async () => {
    const res = await request(app).get("/cache/fetch-key").set({
      'key-name': "BlueBerry"
    })
    expect(res.statusCode).toBe(201);
    expect(res.body.key).toBe("BlueBerry")
    expect(res.body.output).toBe("Cache Miss")
  });
});

describe("DELETE /cache/delete-key", () => {
  it("should delete a key", async () => {
    const res = await request(app).delete(
      "/cache/delete-key"
    )
    .set({
      key_name: "John Doe"
    })
    expect(res.statusCode).toBe(204);
  });
});

describe("DELETE /cache/clear", () => {
  it("should delete all keys and clear cache", async () => {
    const res = await request(app).delete(
      "/cache/clear"
    )
    expect(res.statusCode).toBe(204);
  });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close()
});