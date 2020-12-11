const mongoose = require("mongoose")
var Schema = mongoose.schema;

//creando modelo de gato

catSchema = new mongoose.Schema(
    {
        name:{type:String, require:true}
    }
)

module.exports = mongoose.model("Cat", catSchema);


