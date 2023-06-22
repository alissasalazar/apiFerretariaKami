const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user) => {
  console.log("que me da el user en utils", user);
  // modificando el user para no tener referencia circular
  const modifiedUser = {
    email: user.email,
    password: user.password,
  };
  // Creando token con jsonwebtoken
  const token = jwt.sign({ user: modifiedUser }, "secretKey", {
    expiresIn: "1h",
  });
  return token;
};

// Creando la funcion para verificar que el token usado es correcto
// Next se usara solo cuando sea exitoso
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  console.log("que me da bearerHeader", bearerHeader);
  const bearerToken = bearerHeader.split(" ")[1];
  console.log("que me da bearerToken", bearerToken);

  if (!bearerToken) {
    return res.status(401).json({ error: "message" });
  }
  //verificando el token
  jwt.verify(bearerToken, "secretKey", (error, credentials) => {
    console.log("que me da credentials", credentials);
    if (error) {
      return res.status(401).json({ error: "message" });
    }
    req.user = credentials.user;
    next();
  });
};

//funcion para encriptar contraseñas
const createHashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

//funcion para corroborar si el password ingresado es igual al de la BD
const passwordValid = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const time = () =>{
  const hora = new Date()
  
  const fechaDelivering = hora.toISOString().slice(0, 10);

  const horaDelivering = hora.toString().slice(15, 25);

  const horaFin = fechaDelivering + horaDelivering;
  
  return horaFin
}
module.exports = {
  createToken,
  verifyToken,
  createHashPassword,
  passwordValid,
  time
};
