// models/PrecioMaterial.js
const mongoose = require('mongoose');

const PrecioMaterialSchema = new mongoose.Schema({
  materialId: { type: String, required: true },
  precio: { type: Number, required: true },
});

const PrecioMaterial = mongoose.model('PrecioMaterial', PrecioMaterialSchema);

module.exports = PrecioMaterial;
