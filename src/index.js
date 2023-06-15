const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;
const userRoutes = require("./routes/user.js")
//middleware
app.use(express.json())
app.use("/api",userRoutes)


// routes
app.get("/", (req, res) => {
  res.send("Welcome to Alissa's API");
});
// mongoDb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongoDB Atlas"))
  .catch((error) => console.error(error))

app.listen(port, () => console.log("El servidor escucha en el puerto", port));
