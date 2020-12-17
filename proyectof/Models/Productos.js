const mongoose = require("mongoose")
var Schema = mongoose.Schema;

// Creando modelo gato

productosSchema = new Schema(
    {
        name:{type:String, required:true}
    }
)

module.exports = mongoose.model("Productos", productosSchema );