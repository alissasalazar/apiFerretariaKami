const express = require("express");
const { default: mongoose } = require("mongoose");
const utils = require("../src/Utils/utils.js")
// Dotenv me permite crear variables de ambiente y con config() permite crear variables de ambiente
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;
const userRoutes = require("./routes/user.js")
const loginRoutes = require("./routes/login.js")
const productsRoutes = require("./routes/products.js")

//middleware
app.use(express.json())
//ruta de inicio
app.use("/api",loginRoutes)

//Se pedirá el token para que tengan permiso de ver lo siguiente:
app.use(utils.verifyToken)
app.use("/api",userRoutes)
app.use("/api",productsRoutes)


// mongoDb connection
// MongoDbURI tiene el URI que obtuvimos de mongo atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongoDB Atlas"))
  .catch((error) => console.error(error))

app.listen(port, () => console.log("El servidor escucha en el puerto", port));

module.exports = app