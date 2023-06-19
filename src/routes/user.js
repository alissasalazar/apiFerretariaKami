const express = require("express");
const userSchema = require("../models/user.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Creando la funcion para verificar que el token usado es correcto
// Next se usara solo cuando sea exitoso
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log("que me da bearerHeader", bearerHeader);

  if (typeof bearerHeader !== "undefined") {
    // Authorization: Bearer <token>
    // obtener solo el token
    const bearerToken = bearerHeader.split(" ")[1];
    console.log("que me da bearerToken", bearerToken);
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

//create user
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  // Creando token con jsonwebtoken

  jwt.sign({ user }, "secretKey", (err, token) => {
    res.json({
      token,
    });
  });

  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get all Users
//Colocamos el verifyToken porque es un midleware, esta funcion pasara antes del req,res
router.get("/users", verifyToken, (req, res) => {
  console.log("que me da req.token", req.token);
  jwt.verify(req.token, "secretkey", (error,data) => {
    if (error) {
      res.sendStatus(401);
    } else {
      res.send("Hola");
      // userSchema
      //   .find()
      //   .then((data) => res.json(data))
      //   .catch((error) => res.json({ message: error }));
    }
  });
});

//Get a user
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
