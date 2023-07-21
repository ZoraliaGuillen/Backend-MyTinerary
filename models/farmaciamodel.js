const mongoose = require("mongoose")

const farmaciaSchema = new mongoose.Schema({
    id:{type:Number, required:true},
    categoria:{type:String, required:true},
    subcategoria:{type:String, required:true},
    marca:{type:String, required:true},
    fotoMarca:{type:String, required:true},
    producto:{type:String, required:true},
    fotoProducto:{type:String, required:true},
    precio:{type:Number, required:true},
})

const Farmacia = mongoose.model("Farmacia.farmacia", farmaciaSchema)
module.exports = Farmacia