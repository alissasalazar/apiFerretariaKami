const mongoose = require("mongoose");
console.log("ingreso a esquema");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  dateEntry: {
    type: String,
  },
});

productSchema.pre("save", (next) => {
  //Verifico si es usuario nuevo o se esta actualizando
  if (!this.isNew) {
    return next();
  }
});
module.exports = mongoose.model("products", productSchema);
