const app = require("../../src");
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

describe("Pruebas en la Api de Ferreteria Kamis", () => {
  describe("GET/api/users", () => {

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
});
