const app = require("../../src");
const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();

describe("Pruebas en la Api de Ferreteria Kamis", () => {
  const newUSer = {
    name: "Kevin Condori",
    email: "condori@gmail.com",
  };
  describe("GET/", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
      await mongoose.disconnect();
    });

    let response;
    beforeEach(async () => {
      response = await request(app).get("/").send();
    });

    it("la ruta funciona", async () => {
      expect(response.status).toBe(200);
    });
  });

  describe("GET/api/users", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
      await mongoose.disconnect();
    });

    let response;
    beforeEach(async () => {
      response = await request(app).get("/api/users").send();
    });

    it("la ruta funciona", async () => {
      expect(response.status).toBe(200);
    });
  });

  describe("POST/api/users", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
      await mongoose.disconnect();
    });

    // afterAll(() => {
    //   await ;
    // });

    let response;
    beforeEach(async () => {
      response = await request(app).post("/api/users").send(newUSer);
    });

    it("la ruta funciona", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("Se inserta correctamente", async () => {
      expect(response.body.name).toBe(newUSer.name);
    });
  });

  // describe("PUT/api/users", () => {
  //   it("La ruta funciona", async () => {
  //     console.log("me da el id", newUSer._id);
  //     const response = (
  //       await request(app).put(`/api/users/${newUSer._id}`)
  //     ).send({
  //       name: "Shey Salazar",
  //       email: "sheysalazar@gmail.com",
  //     });

  //     expect(response.status).toBe(200);
  //   });
  // });
});
