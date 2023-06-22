const express = require("express");
const userSchema = require("../models/user.js");
const router = express.Router();
const utils = require("../Utils/utils.js")
// Realizamos el login
router.post("/login", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  // Obtener un usuario en especifico
  const user = await userSchema.findOne({ email });
  console.log("que nos da el user", user);
  const accessToken = utils.createToken(user);
  console.log("que nos da accessToken", accessToken);
  // Si no se colocan ni email ni password enviar estado 400
  if (!email || !password) {
    return res.status(400).send({
      error: "string",
    });
  }
  if (!utils.passwordValid(user, password)) {
    return res.status(404).send({
      error: "string",
    });
  }
  res.json({
    accessToken,
    user,
  });
});
module.exports = router;
