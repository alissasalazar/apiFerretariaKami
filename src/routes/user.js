const express = require("express");
const userSchema = require("../models/user.js");
const router = express.Router();
const utils = require("../Utils/utils.js");
//create user
router.post("/users", async (req, res) => {
  const email = req.body.email;
  console.log("que me da email", email);
  const user = await userSchema.findOne({ email });

  //Error por falta de contraseña o correo
  if (!email || !req.body.password) {
    return res.status(400).send({
      error: "message",
    });
  }
  //Validamos si ya se uso ese correo y mandamos un error
  if (user)
    return res.status(403).send({
      error: "message",
    });
  //Formato de nuevo usuario
  const newUser = {
    name: req.body.name,
    email,
    password: utils.createHashPassword(req.body.password),
    role: req.body.role,
  };
  console.log("que me da newUser", newUser);
  //Creamos el newUser
  const createdUser = new userSchema(newUser);
  //Guardamos el nuevo usario en la BD
  console.log("que me da createdUser", createdUser);

  try {
    await createdUser.save();
    res.send(newUser);
  } catch (error) {
    console.error("que error hay", error);
    res.status(500).send({ error: "message" });
  }
});

//Get all Users
//FIX PORQUE AQUI AUNQUE LE PONGA ERROR 401, me da error 500? 
router.get("/users", async (req, res) => {
  try{
    const users = await userSchema.find();
    res.json(users);
  }catch(error){
    console.log(error)
    return res.status(401).send({
      error: "message",
    })
  }

});

//Get one user
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  console.log("que me da req.params", req.params);
  console.log("que id me da", id);
  const user = await userSchema.findOne({ _id: id });

  if (!user)
    return res.status(404).send({
      error: "message",
    });

  res.json(user);
});

//Update a user
router.patch("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const modifiedUser = await userSchema.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (!modifiedUser.matchedCount) {
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
router.delete("/users/:id", async(req, res) => {
  const { id } = req.params;

  try{
    await userSchema.deleteOne({ _id: id })
    res.send("Se elimino con exito al usuario")
  }catch(error){
    return res.status(505).send({
      error: "message",
    })
  }

});
module.exports = router;
