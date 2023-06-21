const express = require("express");
const userSchema = require("../models/user.js");
const router = express.Router();
const createHashPassword = require("../Utils/utils.js");
//create user
router.post("/users", async (req, res) => {
  const email = req.body.email;
  console.log("que me da email", email);
  const user = await userSchema.findOne({ email });

  //Error por falta de contraseña o correo
  if (!email || !req.body.password) {
    return res.status(400).send({
      error: "string",
    });
  }
  //Validamos si ya se uso ese correo y mandamos un error
  if (user)
    return res.status(403).send({
      error: "string",
    });
  //Formato de nuevo usuario
  const newUser = {
    "name":req.body.name,
    email,
    "password": createHashPassword(req.body.password),
    "role": req.body.role,
  };
  console.log("que me da newUser", newUser);
  //Creamos el newUser
  const createdUser = new userSchema(newUser);
  //Guardamos el nuevo usario en la BD
  console.log("que me da createdUser", createdUser)

  try {
    await createdUser.save()
    res.send(newUser);
  } catch(error) {
    console.error("que error hay",error);
    res.status(500).send({ error: "string" });
  }
});

//Get all Users
router.get("/users",async (req, res) => {
  const users= await userSchema.find()
  res.json(users)
});

//Get one user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
module.exports = router;
