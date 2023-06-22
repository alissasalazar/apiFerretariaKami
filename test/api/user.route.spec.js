const app = require("../../src");
const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();

describe("Pruebas en la Api/users de Ferreteria Kamis", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJKb3JnZSBDb3VjaCIsImVtYWlsIjoiam9yZ2VfY291Y2hAZ21haWwuY29tIiwiX2lkIjoiNjQ5MDczYmI4NmY5MGUwN2UwZTA5NDNjIn0sImlhdCI6MTY4NzE4ODQxMX0.HxK7HkG-tEFr6rxx4FWbmNPgnBDsTGPmSbWvIfPW8n4";

  describe("GET/api/users", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });
    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("Deberia retornar correctamente la lista de usuarios", async () => {
      const response = await request(app)
        .get("/api/users")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("No deberia mostrar la lista de usuarios, token invalido", async () => {
      const invalidToken = "your_invalid_token_here";
      const response = await request(app)
        .get("/api/users")
        .set("authorization", `Bearer ${invalidToken}`);
      expect(response.status).toBe(401);
    });

    // it("No deberia mostrar la lista de usuarios, no hay token", async () => {
    //   const response = await request(app)
    //     .get("/api/users")
    //   console.log("que trae el response", response);
    //   expect(response.status).toBe(401);
    // });
  });

  describe("POST/api/users", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
      await mongoose.disconnect();
    });

    const newUSer = {
      name: "Lore Tuo",
      email: "loreTuo@gmail.com",
      password: "123456",
      role: "administrador",
    };

    it("Deberia agregar correctamente al usuario", async () => {
      const response = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .send(newUSer);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("No deberia agregar correctamente al usuario,token invalido", async () => {
      const invalidToken = "your_invalid_token_here";
      const response = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${invalidToken}`)
        .send(newUSer);
      expect(response.status).toBe(401);
      expect(response.headers["content-type"]).toContain("json");
    });
  });

  describe("GET/api/users/id", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });
    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("Deberia retornar correctamente al usuario especifico", async () => {
      const response = await request(app)
        .get("/api/users/6490cd1be3fe2319b6497178")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe("PATCH/api/users/id", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });
    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("Deberia hacer correctamente la actualizacion, con el token entregado", async () => {
      const userId = "648b35310fdabe97ae3d8dd8";
      const updateUserData = {
        name: "Prueba User",
        // email:"update@example.com",
        // password:"newpassword"
      };
      const response = await request(app)
        .patch(`/api/users/${userId}`)
        .set("authorization", `Bearer ${token}`)
        .send(updateUserData);
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE/api/users/id", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });
    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("Deberia eliminar correctamente al usuario especifico", async () => {
      const response = await request(app)
        .delete("/api/users/648b9373393507a589fe8bb6")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});

describe("Pruebas en la Api/products de Ferreteria Kamis", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJKb3JnZSBDb3VjaCIsImVtYWlsIjoiam9yZ2VfY291Y2hAZ21haWwuY29tIiwiX2lkIjoiNjQ5MDczYmI4NmY5MGUwN2UwZTA5NDNjIn0sImlhdCI6MTY4NzE4ODQxMX0.HxK7HkG-tEFr6rxx4FWbmNPgnBDsTGPmSbWvIfPW8n4";



  describe("GET/api/products", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });
    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("Deberia retornar correctamente la lista de productos", async () => {
      const response = await request(app)
        .get("/api/products")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("No deberia mostrar la lista de usuarios, token invalido", async () => {
      const invalidToken = "your_invalid_token_here";
      const response = await request(app)
        .get("/api/products")
        .set("authorization", `Bearer ${invalidToken}`);
      expect(response.status).toBe(401);
    });

    // it("No deberia mostrar la lista de usuarios, no hay token", async () => {
    //   const response = await request(app)
    //     .get("/api/users")
    //   console.log("que trae el response", response);
    //   expect(response.status).toBe(401);
    // });
  });

  describe("POST/api/products", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
      await mongoose.disconnect();
    });

    const newProduct = {
      name: "fragua roja",
      price: "10",
      image: "img",
      type: "otros",
    };

    const oldProduct = {
      name: "fragua azul",
      price: "10",
      image: "img",
      type: "otros",
    };

    it("Deberia agregar correctamente el producto", async () => {
      const response = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send(newProduct);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("No deberia agregar correctamente el producto,ya existe", async () => {
      const response = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send(oldProduct);
      expect(response.status).toBe(403);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("No deberia agregar correctamente al producto,token invalido", async () => {
      const invalidToken = "your_invalid_token_here";
      const response = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${invalidToken}`)
        .send(newProduct);
      expect(response.status).toBe(401);
      expect(response.headers["content-type"]).toContain("json");
    });
  });

  describe("GET/api/products/id", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });
    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("Deberia retornar correctamente al producto especifico", async () => {
      const response = await request(app)
        .get("/api/products/64930640743d3d4cf6b26276")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe("PATCH/api/products/id", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });
    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("Deberia hacer correctamente la actualizacion, con el token entregado", async () => {
      const userId = "64930640743d3d4cf6b26276";
      const updateProductData = {
        name: "Brazo de ducha",
        // email:"update@example.com",
        // password:"newpassword"
      };
      const response = await request(app)
        .patch(`/api/products/${userId}`)
        .set("authorization", `Bearer ${token}`)
        .send(updateProductData);
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE/api/products/id", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
    });
    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("Deberia eliminar correctamente al producto especifico", async () => {
      const response = await request(app)
        .delete("/api/products/649308bc91b5363a37119002")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
