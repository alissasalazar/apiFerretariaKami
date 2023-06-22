const express = require("express");
const productSchema = require("../models/products.js");
const router = express.Router();
const utils = require("../Utils/utils.js");
//create user
router.post("/products", async (req, res) => {
  const name = req.body.name;
  const product = await productSchema.findOne({ name });

  //Error por falta de contraseña o correo
  if (!name || !req.body.price) {
    return res.status(400).send({
      error: "message",
    });
  }
  //Validamos si ya se uso ese correo y mandamos un error
  if (product)
    return res.status(403).send({
      error: "message",
    });
  //Formato de nuevo usuario
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    type: req.body.type,
    dateEntry: utils.time(),
  };
  console.log("que me da newUser", newProduct);
  //Creamos el newUser
  const createdProduct = new productSchema(newProduct);
  //Guardamos el nuevo usario en la BD
  console.log("que me da createdUser", createdProduct);

  try {
    await createdProduct.save();
    res.send(newProduct);
  } catch (error) {
    console.error("que error hay", error);
    res.status(500).send({ error: "message" });
  }
});

//Get all Users
router.get("/products", async (req, res) => {
  const products = await productSchema.find();
  res.json(products);
});

//Get one user
router.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  console.log("que me da req.params", req.params);
  console.log("que id me da", id);
  const product = await productSchema.findOne({ _id: id });

  if (!product)
    return res.status(404).send({
      error: "message",
    });

  res.json(product);
});

//Update a user
router.patch("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const modifiedProduct = await productSchema.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (!modifiedProduct.matchedCount) {
      return res.status(404).send({ error: "message" });
    }
    res.json({ ...req.body });
  } catch (error) {
    res.status(500).send({
      error: "message",
    });
  }
});

//delete a user
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await productSchema.deleteOne({ _id: id });
    res.send("Se elimino con exito al usuario");
  } catch (error) {
    return res.status(505).send({
      error: "message",
    });
  }
});
module.exports = router;
