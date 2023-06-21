const express = require("express");
const { default: mongoose } = require("mongoose");
const verifyToken = require("../src/Utils/utils.js")
// Dotenv me permite crear variables de ambiente y con config() permite crear variables de ambiente
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;
const userRoutes = require("./routes/user.js")
const loginRoutes = require("./routes/login.js")

//middleware
app.use(express.json())
app.use("/api",loginRoutes)

//Se pedirá el token para que tengan permiso de ver lo siguiente:
// app.use(verifyToken)
app.use("/api",userRoutes)

// routes
app.get("/", (req, res) => {
  res.send("Welcome to Alissa's API");
});

// mongoDb connection
// MongoDbURI tiene el URI que obtuvimos de mongo atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongoDB Atlas"))
  .catch((error) => console.error(error))

app.listen(port, () => console.log("El servidor escucha en el puerto", port));

module.exports = app