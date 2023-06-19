const jwt = require("jsonwebtoken");

export const createToken = (user) => {
  // Creando token con jsonwebtoken
  const token = jwt.sign({ user }, "secretKey", (err, token) => {
    res.json({
      token,
    });
  });
};

// Creando la funcion para verificar que el token usado es correcto
// Next se usara solo cuando sea exitoso
export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
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
};
